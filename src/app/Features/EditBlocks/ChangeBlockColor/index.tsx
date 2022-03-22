import { BaseFeature } from '@features/BaseFeature';
import { getBlocks } from '~/Utils';
export { ColorBlockOption } from './ColorBlockOption';
import { getFlowBlockById, getBlockById } from '~/Utils';
import { colorBlockBackground } from '~/BlipBlocksFunctions';

export class ChangeBlockColor extends BaseFeature {
  public static shouldRunOnce = true;

  public menuOptionElementHandle(id: string, color: string): void {
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);

    block.addonsSettings = { ...block.addonsSettings, color: color };

    colorBlockBackground(color, flowBlock);
  }

  private colorAllBlocks(): void {
    const blocks = getBlocks();

    for (const block of blocks) {
      if (block.addonsSettings && block.addonsSettings.backgroundColor) {
        const flowBlock = getFlowBlockById(block.id);
        colorBlockBackground(block.addonsSettings.backgroundColor, flowBlock);
      }
    }
  }

  public handle(): boolean {
    this.colorAllBlocks();
    return true;
  }
}
