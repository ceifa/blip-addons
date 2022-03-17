import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BaseFeature } from '@features/BaseFeature'
import { getBlocks } from '~/Utils'
import { ShapeBlockOption } from './ShapeBlockOption'
import {
  getFlowBlockById,
  getAllFlowBlock,
  getBlockById,
  interceptFunction,
} from '~/Utils'
import { formatShapeBlock } from '~/BlipBlocksFunctions'

const BUILDER_HTML_MENU_BLOCK_CLASS = 'builder-node-menu'
const BUILDER_HTML_MENU_BLOCK_LIST_CLASS = 'builder-node-context-menu'
const DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT = 'ph3 pv1 bp-fs-7 tc'
const BUILDER_HTML_BLOCK_TAG = 'builder-node'

export class ChangeBlockFormat extends BaseFeature {
  public static shouldRunOnce = true
  //public ranOnReloadingPage = false

  private createBlockOptionsDiv(): any {
    const blipsDiv = document.createElement('div')
    blipsDiv.setAttribute(
      'class',
      DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT
    )
    return blipsDiv
  }

  menuOptionElementHandle(id: string, shape: string) {
    const block = getBlockById(id)
    if (block.addonsSettings) {
      block.addonsSettings.shape = shape
    } else {
      block.addonsSettings = {
        shape: shape,
      }
    }
    const flowBlock = getFlowBlockById(id)
    formatShapeBlock(shape, flowBlock)
  }

  private addChangeFormatOptionOnBlockById(id: string) {
    const menuOptionsList = document.querySelector(
      `${BUILDER_HTML_BLOCK_TAG}[id="${id}"] .${BUILDER_HTML_MENU_BLOCK_CLASS} .${BUILDER_HTML_MENU_BLOCK_LIST_CLASS}`
    )
    if(!menuOptionsList){
      return
    }
    const menuOptionElement = this.createBlockOptionsDiv()
    ReactDOM.render(
      <ShapeBlockOption id={id} onClick={this.menuOptionElementHandle} />,
      menuOptionElement
    )
    menuOptionsList.appendChild(menuOptionElement)
  }

  addOptionToChangeFormatInAllBlocks = () => {
    const blocks = getAllFlowBlock()
    for (let block of blocks) {
      this.addChangeFormatOptionOnBlockById(block.id)
    }
  }

  private formatAllBlocks() {
    const blocks = getBlocks()
    let flowBlock = {}
    for (let block of blocks) {
      if (block.addonsSettings && block.addonsSettings.shape) {
        flowBlock = getFlowBlockById(block.id)
        try {
          formatShapeBlock(block.addonsSettings.shape, flowBlock)
        } catch (error) {
          
        }
      }
    }
  }

  public handle() {
    this.formatAllBlocks()
    this.addOptionToChangeFormatInAllBlocks()
    /*interceptFunction(
      'addContentState',
      this.addOptionToChangeFormatInAllBlocks
    )
    interceptFunction('addDeskState', this.addOptionToChangeFormatInAllBlocks)*/
    return true
  }

  public cleanup() {}
}


