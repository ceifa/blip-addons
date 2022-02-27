import { v4 as uuid } from 'uuid'

import { BaseFeature } from './BaseFeature'
import {
  cleanCopiedStates,
  cleanSelectedNodes,
  getBlocks,
  getFlow,
  selectBlock,
  showSuccessToast,
} from '../Utils'
import type { BlipsCopy } from '../types'

export class PasteBlock extends BaseFeature {
  /**
   * This feature should only be executed once
   */
  public static shouldRunOnce = true

  /**
   * Map of cached ids
   */
  private cachedIds = new Map<string, string>()

  private getIdFor(id: string) {
    if (this.cachedIds.has(id)) {
      return this.cachedIds.get(id)
    }

    const newId = uuid()
    this.cachedIds.set(id, newId)
    return newId
  }

  /**
   * Handles the copy
   */
  private async handlePaste(event: ClipboardEvent) {
    const flow = getFlow()
    const clipboardData = event.clipboardData.getData('text')
    const blipsCopy = JSON.parse(clipboardData)

    if (isCopyFromBlips(blipsCopy)) {
      cleanCopiedStates()
      cleanSelectedNodes()

      const blocks = JSON.parse(blipsCopy.blocksCode)

      if (blocks.length > 0) {
        /**
         * Adds all the blocks to the flow, if the block already
         * exists in canvas, then tranverse the block replacing
         * the ids
         */
        for (const block of blocks) {
          this.transverseBlock(block)
          flow[block.id] = block
          selectBlock(block.id)
        }

        /**
         * After including all the block into the flow, we need
         * to check if they're still valid
         */
        for (const block of blocks) {
          this.treatBlock(block)
        }

        showSuccessToast('Bloco(s) colado(s) com sucesso')
      }
    }
  }

  /**
   * Returns if the block exists
   */
  public blockExists(id: string) {
    const existingBlocksId = getBlocks().map((block) => block.id)

    return existingBlocksId.includes(id)
  }

  /**
   * Treats the block by applying verifications, corrections
   * and
   *
   * @param block The block
   */
  private treatBlock(block: any) {
    const outputs = [...block.$conditionOutputs, block.$defaultOutput]
    let isInvalid = false

    for (const output of outputs) {
      if (!this.blockExists(output.stateId)) {
        isInvalid = true
        output.$invalid = true
        delete output.stateId
      }
    }

    if (isInvalid) {
      block.$invalid = true
      block.invalidOutputs = true
    }
  }

  /**
   * Transverse the block replacing its ids
   *
   * @param block The block
   */
  public transverseBlock(block: any) {
    const keys = Object.keys(block)

    for (const key of keys) {
      const isNestedObject = typeof block[key] === 'object'

      if (isNestedObject) {
        this.transverseBlock(block[key])
      } else {
        const isId = ['id', '$id', 'stateId'].includes(key)

        if (isId) {
          const isDefaultBlock = this.isDefaultBlock(block[key])
          const isExistingId = this.blockExists(block[key])
          const shouldChangeId = !isExistingId || !isDefaultBlock

          if (shouldChangeId) {
            block[key] = this.getIdFor(block[key])
          }
        }
      }
    }
  }

  /**
   * Returns if the block is a default block
   *
   * @param id The id of the block
   */
  private isDefaultBlock(id: string) {
    const defaultBlocks = ['onboarding', 'welcome', 'error', 'fallback']

    return defaultBlocks.includes(id)
  }

  /**
   * Adds the functionality of pasting the block
   */
  public handle() {
    document.body.addEventListener('paste', this.handlePaste.bind(this))
  }

  /**
   * Removes the functionality of pasting the block
   */
  public cleanup() {
    document.body.removeEventListener('paste', this.handlePaste.bind(this))
  }
}

const isCopyFromBlips = (data: any): data is BlipsCopy => !!data.isCopyFromBlips
