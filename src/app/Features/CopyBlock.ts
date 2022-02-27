import { BaseFeature } from './BaseFeature'
import { getBlocks, showSuccessToast } from '../Utils'
import type { BlipsCopy } from '../types'

export class CopyBlock extends BaseFeature {
  /**
   * Only runs this feature once
   */
  public static shouldRunOnce = true

  /**
   * Handles the copy
   */
  private async handleCopy() {
    const selectedNodesId = this.getSelectedNodesId()
    const hasSelectedNodes = selectedNodesId.length > 0

    if (hasSelectedNodes) {
      this.copyBlocks(selectedNodesId)
      showSuccessToast('Bloco(s) copiado(s) com sucesso')
    }
  }

  /**
   * Get the code of the selected blocks and write to the
   * clipboard
   *
   * @param blocksId The blocks ids
   */
  private copyBlocks(blocksId: any[]) {
    const selectedBlocks = getBlocks().filter((block) =>
      blocksId.includes(block.id)
    )

    this.copyToClipboard(selectedBlocks)
  }

  /**
   * Copy the content to the clipboard
   *
   * @param content The content
   */
  private copyToClipboard(content: any) {
    const blocksCode = JSON.stringify(content)

    window.navigator.clipboard.writeText(
      JSON.stringify({
        isCopyFromBlips: true,
        blocksCode,
      } as BlipsCopy)
    )
  }

  /**
   * Returns all the selected nodes
   */
  private getSelectedNodesId() {
    const selectedNodes = document.querySelectorAll('.selected-node')

    return Array.from(selectedNodes).map((node) => node.getAttribute('id'))
  }

  /**
   * Adds the functionality to copy the block
   */
  public handle() {
    document.body.addEventListener('copy', this.handleCopy.bind(this))
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup() {
    document.body.removeEventListener('copy', this.handleCopy.bind(this))
  }
}
