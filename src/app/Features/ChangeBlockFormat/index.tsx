import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BaseFeature } from '@features/BaseFeature';
import { getBlocks } from '~/Utils';
import { ShapeBlockOption } from './ShapeBlockOption';
import { getFlowBlockById, getAllFlowBlock, getBlockById } from '~/Utils';
import { formatShapeBlock, Shapes } from '~/BlipBlocksFunctions';

const BUILDER_HTML_MENU_BLOCK_CLASS = 'builder-node-menu';
const BUILDER_HTML_MENU_BLOCK_LIST_CLASS = 'builder-node-context-menu';
const DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT = 'ph3 pv1 bp-fs-7 tc';
const BUILDER_HTML_BLOCK_TAG = 'builder-node';

export class ChangeBlockFormat extends BaseFeature {
  public static shouldRunOnce = true;

  private createBlockOptionsDiv(): any {
    const blipsDiv = document.createElement('div');
    blipsDiv.setAttribute(
      'class',
      DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT
    );
    return blipsDiv;
  }

  public menuOptionElementHandle(id: string, shape: Shapes): void {
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

    return true;
  }
}
