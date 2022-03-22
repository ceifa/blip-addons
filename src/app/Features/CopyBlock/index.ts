import { BaseFeature } from '@features/BaseFeature';
import { getBlockById, getBotName, showSuccessToast } from '~/Utils';
import type { BlipsCopy } from '~/types';

export class CopyBlock extends BaseFeature {
  public static shouldRunOnce = true;

  /**
   * Handles the copy of one or more blocks in the Builder
   */
  private handleCopy = (e): void => {
    const selectedNodesId = this.getSelectedNodesId();
    const hasSelectedNodes = selectedNodesId.length > 0;
    const isBlockCopy = e.srcElement.id === 'sidebar-title';

    if (hasSelectedNodes && isBlockCopy) {
      this.copyBlocks(selectedNodesId);
      showSuccessToast('Bloco(s) copiado(s) com sucesso');
    }
  };

  /**
   * Get the code of the selected blocks and write to the
   * clipboard
   *
   * @param blocksId The blocks ids
   */
  private copyBlocks(blocksId: any[]): void {
    const selectedBlocks = [];

    for (const blockId of blocksId) {
      const block = getBlockById(blockId);

      if (block) {
        selectedBlocks.push(block);
      }
    }

    this.copyToClipboard(selectedBlocks);
  }

  /**
   * Copy the content to the clipboard
   *
   * @param content The content
   */
  private copyToClipboard(content: any): void {
    const blocksCode = JSON.stringify(content);

    window.navigator.clipboard.writeText(
      JSON.stringify({
        isCopyFromBlips: true,
        originBot: getBotName(),
        blocksCode,
      } as BlipsCopy)
    );
  }

  /**
   * Returns all the selected nodes
   */
  private getSelectedNodesId(): string[] {
    const selectedNodes = document.querySelectorAll('.selected-node');

    return Array.from(selectedNodes).map((node) => node.getAttribute('id'));
  }

  /**
   * Adds the functionality to copy the block
   */
  public handle(): void {
    document.body.addEventListener('copy', this.handleCopy);
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup(): void {
    document.body.removeEventListener('copy', this.handleCopy);
  }
}
