import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { interceptFunction } from '~/Utils';
import { BaseFeature } from '../BaseFeature';
import { BlipsSidebar } from './BlipsSidebar';

const BLIPS_BUTTON_ID = 'blips-extension-button';
const BLIPS_SIDEBAR_ID = 'blips-extension-sidebar-block-edit';

export class EditBlock extends BaseFeature {
  public static shouldRunOnce = true;

  private getSidebar(): HTMLElement {
    return document.getElementById(BLIPS_SIDEBAR_ID);
  }

  private openSidebar = (): void => {
    if (!this.getSidebar()) {
      // Creates and append the sidebar to the dom
      const blipsSidebar = document.createElement('div');

      blipsSidebar.setAttribute('id', BLIPS_SIDEBAR_ID);
      ReactDOM.render(
        <BlipsSidebar onClose={this.closeSidebar} />,
        blipsSidebar
      );

      const mainArea = document.getElementById('main-content-area');
      mainArea.appendChild(blipsSidebar);

      // Waits for a moment and then fades the sidebar in
      const customSidebar = this.getSidebar().children.item(0);
      interceptFunction('closeSidebar', this.closeSidebar);

      setTimeout(() => {
        customSidebar.classList.add('ng-enter-active');
      }, 200);
    } else {
      return this.closeSidebar();
    }
  };

  /**
   * Closes the sidebar by removing it from the DOM
   */
  private closeSidebar = (): void => {
    const sidebar = this.getSidebar();

    if (sidebar) {
      sidebar.remove();
    }
  };

  private createBlockOptionsDiv(): any {
    const blipsDiv = document.createElement('div');
    blipsDiv.setAttribute(
      'class',
      DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT
    );
    return blipsDiv;
  }

  public menuOptionElementHandle(id: string, shape: string): void {
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);

    block.addonsSettings = { ...block.addonsSettings, shape };

    formatShapeBlock(shape, flowBlock);
  }

  private addChangeFormatOptionOnBlockById(id: string): void {
    const menuOptionsList = document.querySelector(
      `${BUILDER_HTML_BLOCK_TAG}[id="${id}"] .${BUILDER_HTML_MENU_BLOCK_CLASS} .${BUILDER_HTML_MENU_BLOCK_LIST_CLASS}`
    );

    if (menuOptionsList) {
      const menuOptionElement = this.createBlockOptionsDiv();

      ReactDOM.render(
        <ShapeBlockOption id={id} onClick={this.menuOptionElementHandle} />,
        menuOptionElement
      );
      menuOptionsList.appendChild(menuOptionElement);
    }
  }

  private addOptionToChangeFormatInAllBlocks = (): void => {
    const blocks = getAllFlowBlock();

    for (const block of blocks) {
      this.addChangeFormatOptionOnBlockById(block.id);
    }
  };

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
    this.addOptionToChangeFormatInAllBlocks();
    if (!this.getIcon()) {
      const buttonsList = document.querySelector(
        '.icon-button-list, .builder-icon-button-list'
      );
      const blipsDiv = document.createElement('div');

      blipsDiv.setAttribute('id', BLIPS_BUTTON_ID);
      ReactDOM.render(<BlipsButton onClick={this.openSidebar} />, blipsDiv);
      buttonsList.appendChild(blipsDiv);

      return true;
    }

    return false;
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup(): void {
    const blipsButton = document.getElementById(BLIPS_BUTTON_ID);

    if (blipsButton) {
      blipsButton.remove();
    }

    this.closeSidebar();
  }
}
