import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BaseFeature } from '@features/BaseFeature';
import { getBlocks } from '~/Utils';
import { ColorBlockOption } from './ColorBlockOption';
import { getFlowBlockById, getAllFlowBlock, getBlockById } from '~/Utils';
import { colorBlockBackground } from '~/BlipBlocksFunctions';

const BUILDER_HTML_MENU_BLOCK_CLASS = 'builder-node-menu';
const BUILDER_HTML_MENU_BLOCK_LIST_CLASS = 'builder-node-context-menu';
const DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT = 'ph3 pv1 bp-fs-7 tc';
const BUILDER_HTML_BLOCK_TAG = 'builder-node';
const BUILDER_HTML_BLOCK_COLOR_INPUT_ID = 'addon-color';
const TEXT_OF_CHANGE_COLOR_BLOCK_OPTION = "Alterar cor: ";

export class ChangeBlockColor extends BaseFeature {
  public static shouldRunOnce = true;

  private createBlockOptionsDiv(): any {
    const blipsDiv = document.createElement('div');
    blipsDiv.setAttribute(
      'class',
      DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT
    );
    return blipsDiv;
  }

  public menuOptionElementHandle(id: string, color: string): void {
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);

    block.addonsSettings = { ...block.addonsSettings, color: color };

    colorBlockBackground(color, flowBlock);
  }

  private addChangeColorOptionOnBlockById(id: string): void {
    const menuOptionsList = document.querySelector(
      `${BUILDER_HTML_BLOCK_TAG}[id="${id}"] .${BUILDER_HTML_MENU_BLOCK_CLASS} .${BUILDER_HTML_MENU_BLOCK_LIST_CLASS}`
    );

    if (menuOptionsList) {
      const menuOptionElement = this.createBlockOptionsDiv();

      ReactDOM.render(
        <ColorBlockOption id={`${BUILDER_HTML_BLOCK_COLOR_INPUT_ID}-${id}`} text={TEXT_OF_CHANGE_COLOR_BLOCK_OPTION} />,
        menuOptionElement
      );
      menuOptionsList.appendChild(menuOptionElement);
    }
  }

  private addOptionToChangeFormatInAllBlocks = (): void => {
    const blocks = getAllFlowBlock();

    for (const block of blocks) {
      console.log(`> Adicionando opção de cor no bloco ${block.id}`)
      this.addChangeColorOptionOnBlockById(block.id);
    }
  };

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
    this.addOptionToChangeFormatInAllBlocks();

    return true;
  }
}
