import { v4 as uuid } from 'uuid'

import { BaseFeature } from './BaseFeature'
import { getFlow } from './Utils'

export class PasteBlock extends BaseFeature {
  /**
   * Only runs this feature once
   */
  public static shouldRunOnce = true

  /**
   * Handles the copy
   */
  private async handlePaste(event: ClipboardEvent) {
    const flow = getFlow()
    const clipboardData = event.clipboardData.getData('text')
    const block = this.fixBlock(JSON.parse(clipboardData))

    flow[block.id] = block
  }

  /**
   * Fix the blocks by setting invalid outputs and removings
   * the destination from conditions output
   *
   * @param block The block
   */
  private fixBlock(block: any) {
    const newBlock = { ...block }

    newBlock.id = uuid()

    this.changeAllIds(newBlock)

    const outputs = newBlock.$conditionOutputs

    for (const output of outputs) {
      delete output.stateId
      output.$invalid = true
    }

    newBlock.$invalid = true
    newBlock.$invalidOutputs = true

    return newBlock
  }

  /**
   * Traverse the block changing the ids for avoiding
   * collision
   *
   * @param block The block
   */
  private changeAllIds(block: Record<string, any>) {
    for (const key of Object.keys(block)) {
      const isNestedObject = typeof block[key] === 'object'

      if (isNestedObject) {
        this.changeAllIds(block[key])
      } else if (['id', '$id'].includes(key)) {
        block[key] = uuid()
      }
    }
  }

  /**
   * Adds the functionality to copy the block
   */
  public handle() {
    document.body.addEventListener('paste', this.handlePaste.bind(this))
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup() {
    document.body.removeEventListener('paste', this.handlePaste.bind(this))
  }
}
