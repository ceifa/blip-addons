import { getBlocks, showSuccessToast, showWarningToast } from "../../Utils";
import { BaseFeature } from "../BaseFeature";

export class SetGlobalTrackings extends BaseFeature {

    /**
    * Sets the expiration time for all the bots
    *
    * @param shouldDeleteCurrentExtras //deixar comentt
    * @param customExtras //deixar comentt
    */
    public handle(customExtras: any, shouldDeleteCurrentExtras: boolean): void {
        const blocks = getBlocks();
        const trackings = getActionsWithTrackingEvent(blocks);
        let blocksUpdated = 0;


        for (const tracking of trackings) {
            if (shouldDeleteCurrentExtras) {
                tracking.settings.extras = customExtras;
                ++blocksUpdated;
            }
            else {
                Object.assign(tracking.settings.extras, customExtras);
            }
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
