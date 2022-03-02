import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Settings } from '../../Settings'

import { convertToHours, interceptFunction, requestFeature } from '../../Utils'
import { BaseFeature } from '../BaseFeature'
import { SetInactivity } from '../SetInactivity'
import { BlipsButton } from './BlipsButton'
import { BlipsSidebar } from './BlipsSidebar'

const BLIPS_BUTTON_ID = 'blips-extension-button'
const BLIPS_SIDEBAR_ID = 'blips-extension-sidebar'

export class AddSidebar extends BaseFeature {
  /**
   * Gets the sidebar
   */
  private getSidebar() {
    return document.getElementById(BLIPS_SIDEBAR_ID)
  }

  /**
   * Gets the icon
   */
  private getIcon() {
    return document.getElementById(BLIPS_BUTTON_ID)
  }

  /**
   * Sets the waiting limit time
   *
   * @param waitingTime The waiting limit time
   */
  private setInactivity(waitingTime: number) {
    const hours = convertToHours(waitingTime)
    Settings.lastGlobalInactivityTime = String(waitingTime)

    requestFeature(SetInactivity.code, 'run', hours)
  }

  /**
   * Opens the sidebar by adding it into the DOM
   */
  private openSidebar = () => {
    if (!this.getSidebar()) {
      // Creates and append the sidebar to the dom
      const blipsSidebar = document.createElement('div')

      blipsSidebar.setAttribute('id', BLIPS_SIDEBAR_ID)
      ReactDOM.render(
        <BlipsSidebar onClose={this.closeSidebar} onAdd={this.setInactivity} />,
        blipsSidebar
      )

      const mainArea = document.getElementById('main-content-area')
      mainArea.appendChild(blipsSidebar)

      // Waits for a moment and then fades the sidebar in
      const customSidebar = this.getSidebar().children.item(0)
      interceptFunction('closeSidebar', this.closeSidebar)

      setTimeout(() => {
        customSidebar.classList.add('ng-enter-active')
      }, 500)
    } else {
      return this.closeSidebar()
    }
  }

  /**
   * Closes the sidebar by removing it from the DOM
   */
  private closeSidebar = () => {
    const sidebar = this.getSidebar()

    if (sidebar) {
      sidebar.remove()
    }
  }

  /**
   * Adds the functionality to copy the block
   */
  public handle() {
    if (!this.getIcon()) {
      const buttonsList = document.querySelector('.icon-button-list')
      const blipsDiv = document.createElement('div')

      blipsDiv.setAttribute('id', BLIPS_BUTTON_ID)
      ReactDOM.render(<BlipsButton onClick={this.openSidebar} />, blipsDiv)
      buttonsList.appendChild(blipsDiv)
    }
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup() {
    const blipsButton = document.getElementById(BLIPS_BUTTON_ID)

    if (blipsButton) {
      blipsButton.remove()
    }

    this.closeSidebar()
  }
}
