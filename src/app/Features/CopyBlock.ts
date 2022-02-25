import { BaseFeature } from './BaseFeature'
import { getFlow } from './Utils'

export class CopyBlock extends BaseFeature {
  /**
   * Only runs this feature once
   */
  public static shouldRunOnce = true

  /**
   * Handles the copy
   */
  private async handleCopy() {
    const selectedNode = document.querySelector('.selected-node')

    if (selectedNode) {
      const selectedNodeId = selectedNode.getAttribute('id')
      const flow = getFlow()
      const blockCopy = flow[selectedNodeId]

      window.navigator.clipboard.writeText(JSON.stringify(blockCopy))
    }
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
