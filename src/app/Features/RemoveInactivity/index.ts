import { getBlocks, showSuccessToast } from '../../Utils'
import { BaseFeature } from '../BaseFeature'

const SKIP_BLOCKS = ['onboarding', 'fallback', 'error']

export class RemoveInactivity extends BaseFeature {
  public static isUserTriggered = true

  /**
   * Sets the expiration time for all the bots
   *
   * @param expirationTime The expiration time
   */
  public handle() {
    console.log('Executando...')

    const blocks = getBlocks()
      .filter(isExpirableBlock)
      .filter(hasInput)
      .filter(isInputBlock)
    let blocksUpdated = 0

    for (const block of blocks) {
      const inputAction = getInputAction(block)

      if (inputAction.input.expiration) {
        delete inputAction.input.expiration
        ++blocksUpdated
      }
    }

    showSuccessToast(`${blocksUpdated} bloco(s) alterado(s)`)
  }
}

const isExpirableBlock = (block) => !SKIP_BLOCKS.includes(block.id)
const getInputAction = (block) =>
  block.$contentActions.find((contentAction) => contentAction['input'])
const hasInput = (block) => !!getInputAction(block)
const isInputBlock = (block) => !getInputAction(block).input.bypass