import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BaseFeature } from '@features/BaseFeature';
import { CleanButton } from './CleanButton';
import { Settings } from '~/Settings';

const BLIPS_BUTTON_ID = 'blips-clean-button';

export class CleanEnvironment extends BaseFeature {
  public static shouldRunOnce = true;

  private getIconButton(): HTMLElement {
    return document.getElementById(BLIPS_BUTTON_ID);
  }

  private getMainNavBar(): HTMLElement {
    return document.querySelector('.main-navbar-content');
  }

  private getBuilderContainer(): HTMLElement {
    return document.querySelector('.builder-container');
  }

  private clean = (): void => {
    const mainNavBar = this.getMainNavBar();
    const builderContainer = this.getBuilderContainer();

    if (builderContainer) {
      builderContainer.style.height = 'calc(100vh - 56px)';
    }

    if (mainNavBar) {
      mainNavBar.style.display = 'none';
    }
  };

  private undo = (): void => {
    const mainNavBar = this.getMainNavBar();

    if (mainNavBar) {
      mainNavBar.style.display = 'block';
    }
  };

  public handle(): boolean {
    if (!this.getIconButton()) {
      const buttonsList = document.querySelector(
        '.icon-button-list, .builder-icon-button-list'
      );
      const blipsDiv = document.createElement('div');

      blipsDiv.setAttribute('id', BLIPS_BUTTON_ID);
      ReactDOM.render(
        <CleanButton clean={this.clean} undo={this.undo} />,
        blipsDiv
      );
      buttonsList.appendChild(blipsDiv);

      if (Settings.isCleanEnviroment) {
        this.clean();
      }

      return false;
    }

    return true;
  }

  /**
   * Removes the functionality to clean environment
   */
  public cleanup(): void {
    const blipsButton = document.getElementById(BLIPS_BUTTON_ID);
    this.undo();

    if (blipsButton) {
      blipsButton.remove();
    }
  }
}
