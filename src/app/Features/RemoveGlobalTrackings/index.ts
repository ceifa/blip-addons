import { BaseFeature } from '../BaseFeature';
import { getBlocks, showSuccessToast, showWarningToast } from '~/Utils';

export class RemoveGlobalTrackings extends BaseFeature {
  public static isUserTriggered = true;

  /**
   * Remove the all defined global tracking in all the blocks
   *
   * @param customExtras The trackings that will be removed
   */
  public handle(customExtras: any): void {
    const blocks = getBlocks();
    const blocksWithTrackingAction = getActionsWithTrackingEvent(blocks);

    let blocksUpdated = 0;

    for (const blockWithTracking of blocksWithTrackingAction) {
      let wasBlockUpdated = false;

      for (const extra of customExtras) {
        if (blockWithTracking.settings.extras[extra.key]) {
          wasBlockUpdated = true;
          delete blockWithTracking.settings.extras[extra.key];
        }
      }

      if (wasBlockUpdated) {
        blocksUpdated++;
      }
    }

    if (blocksUpdated > 0) {
      showSuccessToast(`${blocksUpdated} bloco(s) alterado(s)`);
    } else {
      showWarningToast('Nenhum bloco alterado');
    }
  }
}

const getActionsWithTrackingEvent = (blocks: any): any => {
  return blocks.flatMap((block) => getAllActions(block).filter(isTracking));
};
const isTracking = (action: any): boolean => action.type === 'TrackEvent';
const getAllActions = (block: any): any => [
  ...block.$enteringCustomActions,
  ...block.$leavingCustomActions,
];
