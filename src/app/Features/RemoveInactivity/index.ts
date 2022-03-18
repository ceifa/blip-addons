import { BaseFeature } from '../BaseFeature';
import { getBlocks, showSuccessToast, showWarningToast } from '~/Utils';

const SKIP_BLOCKS = ['onboarding', 'fallback', 'error'];

export class RemoveInactivity extends BaseFeature {
  public static isUserTriggered = true;

  /**
   * Sets the expiration time for all the bots
   *
   * @param expirationTime The expiration time
   */
  public handle(): void {
    const blocks = getBlocks()
      .filter(isExpirableBlock)
      .filter(hasInput)
      .filter(isInputBlock);
    let blocksUpdated = 0;

    for (const block of blocks) {
      const inputAction = getInputAction(block);

      if (inputAction.input.expiration) {
        delete inputAction.input.expiration;
        ++blocksUpdated;
      }
    }

    if (blocksUpdated > 0) {
      showSuccessToast(`${blocksUpdated} bloco(s) alterado(s)`);
    } else {
      showWarningToast('Nenhum bloco alterado');
    }
  }
}

const isExpirableBlock = (block): boolean => !SKIP_BLOCKS.includes(block.id);
const getInputAction = (block): any =>
  block.$contentActions.find((contentAction) => contentAction['input']);
const hasInput = (block): boolean => !!getInputAction(block);
const isInputBlock = (block): boolean => !getInputAction(block).input.bypass;
