import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { interceptFunction } from '~/Utils';
import { BaseFeature } from '../BaseFeature';
import { BlockStyleSidebar } from './BlockStyleSidebar';
import {
  getFlowBlockById,
  getAllFlowBlock,
  getBlockById,
  getContrastColor,
  hexToRgb,
} from '~/Utils';
import {
  colorBlockBackground,
  formatShapeBlock,
  Shapes,
  colorBlockText,
} from './BlipBlocksFunctions';
import { EditBlockOption } from './EditBlockOption';
import { ChangeBlockFormat } from './ChangeBlockFormat';
import { ChangeBlockColor } from './ChangeBlockColor';
import { ChangeTextBlockColor } from './ChangeTextColor';

const BLIPS_SIDEBAR_ID = 'blips-extension-sidebar-block-edit';
const BUILDER_MAIN_AEREA_ID = 'main-content-area';
const BUILDER_HTML_MENU_BLOCK_CLASS = 'builder-node-menu';
const BUILDER_HTML_MENU_BLOCK_LIST_CLASS = 'builder-node-context-menu';
const DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT = 'ph3 pv1 bp-fs-7 tc';
const BUILDER_HTML_BLOCK_TAG = 'builder-node';
const DELETE_OPTION_BLOCK_POSITION = 2;

export class EditBlock extends BaseFeature {
  public static shouldRunOnce = true;
  private id = '';

  private getSidebar(): HTMLElement {
    return document.getElementById(BLIPS_SIDEBAR_ID);
  }

  private restoreBlockStyle = (): void => {
    const block = getFlowBlockById(this.id);

    formatShapeBlock(Shapes.DEFAULT, block);
  };

  private openSidebar = (): void => {
    if (!this.getSidebar()) {
      // Creates and append the sidebar to the dom
      const blipsSidebar = document.createElement('div');

      blipsSidebar.setAttribute('id', BLIPS_SIDEBAR_ID);
      ReactDOM.render(
        <BlockStyleSidebar
          id={this.id}
          onEditBackgorundColor={this.onEditBackgorundColor}
          onEditTextColor={this.onEditTextColor}
          onEditShape={this.onEditShape}
          onClose={this.closeSidebar}
          onRestore={this.restoreBlockStyle}
        />,
        blipsSidebar
      );

      const mainArea = document.getElementById(BUILDER_MAIN_AEREA_ID);
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

  private closeSidebar = (): void => {
    const sidebar = this.getSidebar();

    if (sidebar) {
      sidebar.remove();
    }
  };

  private onEditBackgorundColor = (id: string, color: string): void => {
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);
    const currentTextColor = hexToRgb(color);
    const newTextColor = getContrastColor(currentTextColor);

    block.addonsSettings = { ...block.addonsSettings, backgroundColor: color };

    colorBlockBackground(color, flowBlock);
    colorBlockText(newTextColor, flowBlock);
  };

  private onEditTextColor = (id: string, color: string): void => {
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);

    block.addonsSettings = { ...block.addonsSettings, textColor: color };

    colorBlockText(color, flowBlock);
  };

  private onEditShape = (id: string, shape: Shapes): void => {
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);

    block.addonsSettings = { ...block.addonsSettings, shape };

    formatShapeBlock(shape, flowBlock);
  };

  private createBlockOptionsDiv(): any {
    const blipsDiv = document.createElement('div');
    blipsDiv.setAttribute(
      'class',
      DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT
    );
    return blipsDiv;
  }

  public menuOptionElementHandle = (id: string): void => {
    this.id = id;
    this.openSidebar();
  };

  private addChangeFormatOptionOnBlockById(id: string): void {
    const menuOptionsList = document.querySelector(
      `${BUILDER_HTML_BLOCK_TAG}[id="${id}"]:not(.subflow-block) .${BUILDER_HTML_MENU_BLOCK_CLASS} .${BUILDER_HTML_MENU_BLOCK_LIST_CLASS}`
    );

    if (menuOptionsList) {
      const editOption = menuOptionsList.querySelector('.edit-block-option');

      if (!editOption) {
        const menuOptionElement = this.createBlockOptionsDiv();

        ReactDOM.render(
          <EditBlockOption id={id} onClick={this.menuOptionElementHandle} />,
          menuOptionElement
        );
        menuOptionsList.insertBefore(
          menuOptionElement,
          menuOptionsList.children[DELETE_OPTION_BLOCK_POSITION]
        );
      }
    }
  }

  private addEditOptionInAllBlocks = (): void => {
    const blocks = getAllFlowBlock();

    for (const block of blocks) {
      this.addChangeFormatOptionOnBlockById(block.id);
    }
  };

  public handle(): boolean {
    this.addEditOptionInAllBlocks();

    new ChangeBlockFormat().handle();
    new ChangeBlockColor().handle();
    new ChangeTextBlockColor().handle();

    interceptFunction('addContentState', () => this.handle());
    interceptFunction('duplicateStateObject', () => this.handle());
    interceptFunction('addDeskState', () => this.handle());

    return true;
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup(): void {
    this.closeSidebar();
  }
}
