import { BaseFeature } from '../BaseFeature';
import { getBlocks, showSuccessToast, showWarningToast } from '~/Utils';

export class SetGlobalTrackings extends BaseFeature {
  public static isUserTriggered = true

  /**
   * Sets the global trackings for all the blocks
   *
   * @param shouldDeleteCurrentExtras Should you keep the trackings that have already been defined
   * @param customExtras The trackings that will be setted
   */
  public handle(customExtras: any, shouldDeleteCurrentExtras: boolean): void {
    const blocks = getBlocks()
    const blocksWithTrackingAction = getActionsWithTrackingEvent(blocks)
    let blocksUpdated = 0

    for (const blockWithTracking of blocksWithTrackingAction) {
      if (shouldDeleteCurrentExtras) {
        blockWithTracking.settings.extras = customExtras
      } else {
        Object.assign(blockWithTracking.settings.extras, customExtras)
      }

      ++blocksUpdated
    }

    if (blocksUpdated > 0) {
      showSuccessToast(`${blocksUpdated} bloco(s) alterado(s)`)
    } else {
      showWarningToast('Nenhum bloco alterado')
    }
  }
}

const getActionsWithTrackingEvent = (blocks: any): any => {
  return blocks.flatMap((block) =>
    getAllActions(block).filter(isTracking)
  )
}
const isTracking = (action: any): boolean => action.type === 'TrackEvent'
const getAllActions = (block: any): any => [
  ...block.$enteringCustomActions,
  ...block.$leavingCustomActions,
]
