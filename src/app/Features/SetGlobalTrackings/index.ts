import { getBlocks, showSuccessToast, showWarningToast } from "../../Utils";
import { BaseFeature } from "../BaseFeature";

export class SetGlobalTrackings extends BaseFeature {

    public static isUserTriggered = true;
    /**
    * Sets the expiration time for all the bots
    *
    * @param shouldDeleteCurrentExtras //deixar comentt
    * @param customExtras //deixar comentt
    */
    public handle(customExtras: any, shouldDeleteCurrentExtras: boolean): void {
        const blocks = getBlocks();
        const blocksWithTrackingAction = getActionsWithTrackingEvent(blocks);
        let blocksUpdated = 0;


        for (const blockWithTracking of blocksWithTrackingAction) {
            if (shouldDeleteCurrentExtras) {
                blockWithTracking.settings.extras = customExtras;
            }
            else {
                Object.assign(blockWithTracking.settings.extras, customExtras);
            }
           
            ++blocksUpdated;
        }

        if (blocksUpdated > 0) {
            showSuccessToast(`${blocksUpdated} bloco(s) alterado(s)`)
        } else {
            showWarningToast('Nenhum bloco alterado')
        }
    }

}
const getActionsWithTrackingEvent = (blocks) => {
    const trackings = blocks.flatMap(block => getAllActions(block).filter(isTracking));
    return trackings;
}
const isTracking = (action) => action.type === "TrackEvent";
const getAllActions = (block) => [
    ...block.$enteringCustomActions,
    ...block.$leavingCustomActions,
];
