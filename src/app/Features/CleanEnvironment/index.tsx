import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BaseFeature } from '@features/BaseFeature'
import { CleanButton } from './CleanButton'

const BLIPS_BUTTON_ID = 'blips-clean-button'

export class CleanEnvironment extends BaseFeature {

  public static shouldRunOnce = true
  //public static isUserTriggered = false
  //public static hasRun = false

  private getIconButton() {
    return document.getElementById(BLIPS_BUTTON_ID)
  }

  private getMainNavBar(): any {
    return document.querySelector('.main-navbar-content')
  }

  private clean = () => {
    const mainNavBar = this.getMainNavBar()
    mainNavBar.style = 'display: none;'
  }

  private undo = () => {
    const mainNavBar = this.getMainNavBar()
    mainNavBar.style = ''
  }

  /**
   * Adds the functionality to copy the block
   */
  public handle() {
    if (!this.getIconButton()) {
      const buttonsList = document.querySelector(
        '.icon-button-list, .builder-icon-button-list'
      )
      const blipsDiv = document.createElement('div')

      blipsDiv.setAttribute('id', BLIPS_BUTTON_ID)

      ReactDOM.render(<CleanButton clean={this.clean} undo={this.undo}/>, blipsDiv)
      buttonsList.appendChild(blipsDiv)

      return false
    }
    return true
  }

  /**
   * Removes the functionality to clean environment
   */
  public cleanup() {
    const blipsButton = document.getElementById(BLIPS_BUTTON_ID)

    if (blipsButton) {
      blipsButton.remove()
    }
  }
}
