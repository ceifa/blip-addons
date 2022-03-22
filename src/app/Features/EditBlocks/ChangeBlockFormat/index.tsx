import { BaseFeature } from '@features/BaseFeature';
import { getBlocks } from '~/Utils';
export { ShapeBlockOption } from './ShapeBlockOption';
import { getFlowBlockById, getBlockById } from '~/Utils';
import { formatShapeBlock } from '~/BlipBlocksFunctions';


export class ChangeBlockFormat extends BaseFeature {
  public static shouldRunOnce = true;

  public menuOptionElementHandle(id: string, shape: string): void {
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);

    block.addonsSettings = { ...block.addonsSettings, shape };

    formatShapeBlock(shape, flowBlock);
  }

  private formatAllBlocks(): void {
    const blocks = getBlocks();

    for (const block of blocks) {
      if (block.addonsSettings && block.addonsSettings.shape) {
        const flowBlock = getFlowBlockById(block.id);

        formatShapeBlock(block.addonsSettings.shape, flowBlock);
      }
    }
  }

  public handle(): boolean {
    this.formatAllBlocks();
    return true;
  }
}
