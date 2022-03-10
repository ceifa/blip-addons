import {
  convertToHours,
  getBlocks,
  showSuccessToast,
  showWarningToast,
} from '../../Utils'
import { BaseFeature } from '../BaseFeature'

const SKIP_BLOCKS = ['onboarding', 'fallback', 'error']

export class SetInactivity extends BaseFeature {
  public static isUserTriggered = true

  /**
   * Sets the expiration time for all the bots
   *
   * @param expirationTime The expiration time
   */
  public handle(expirationTime: number, shouldKeep: boolean) {
    let blocks = getBlocks()
      .filter(isExpirableBlock)
      .filter(hasInput)
      .filter(isInputBlock)

    if (shouldKeep) {
      blocks = blocks.filter(hasExpirationEmpty)
    }

    let blocksUpdated = 0

    for (const block of blocks) {
      const inputAction = getInputAction(block)

      inputAction.input.expiration = convertToHours(expirationTime)
      ++blocksUpdated
    }

    if (blocksUpdated > 0) {
      showSuccessToast(`${blocksUpdated} bloco(s) alterado(s)`)
    } else {
      showWarningToast('Nenhum bloco alterado')
    }
  }
}

const isExpirableBlock = (block) => !SKIP_BLOCKS.includes(block.id)
const getInputAction = (block) =>
  block.$contentActions.find((contentAction) => contentAction['input'])
const hasInput = (block) => !!getInputAction(block)
const isInputBlock = (block) => !getInputAction(block).input.bypass
const hasExpirationEmpty = (block) => !getInputAction(block).input.expiration
