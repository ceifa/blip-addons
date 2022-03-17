import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Shapes } from '~/Enums'
import { BaseFeature } from '@features/BaseFeature'
import { getBlocks } from '~/Utils'
import { MenuBlockOption } from './MenuBlockOption'
import { stringify } from 'uuid'

const BUILDER_HTML_BLOCK_TAG = 'builder-node'
const BUILDER_HTML_MENU_BLOCK_CLASS = 'builder-node-menu'
const BUILDER_HTML_MENU_BLOCK_LIST_CLASS = 'builder-node-context-menu'
const DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT = 'ph3 pv1 bp-fs-7 tc'
const NULL_OR_EMPTY_REGEX = /^\s+$/i

export class ChangeBlockFormat extends BaseFeature {
  public static shouldRunOnce = true

  private getFlowBlockById(id: string): any {
    return document.querySelector(`${BUILDER_HTML_BLOCK_TAG}[id="${id}"]`)
  }

  private formatToEllipse(id: string): void {
    const block = this.getFlowBlockById(id)
    block.style.borderRadius = "50%"
  }

  private formatToUpperConcave(id: string): void {
    const block = this.getFlowBlockById(id)
    block.style.borderRadius = "50% 50% 0 0"
  }

  private formatToLowerConcave(id: string): void {
    const block = this.getFlowBlockById(id)
    block.style.borderRadius = "0 0 50% 50%"
  }

  private formatToLeftConcave(id: string): void {
    const block = this.getFlowBlockById(id)
    block.style.borderRadius = "50% 0 0 50%"
  }

  private formatToRightConcave(id: string): void {
    const block = this.getFlowBlockById(id)
    block.style.borderRadius = "0 50% 50% 0"
  }

  private formatToMainDiagonalConcave(id: string): void {
    const block = this.getFlowBlockById(id)
    block.style.borderRadius = "50% 0 50% 0"
  }

  private formatToSecondaryDiagonalConcave(id: string): void {
    const block = this.getFlowBlockById(id)
    block.style.borderRadius = "0 50% 0 50%"
  }

  private formatToRectangular(id: string): void {
    const block = this.getFlowBlockById(id)
    block.style.borderRadius = "0"
  }

  private format(shape: string, id: string) {
    switch (shape) {
      case "Ellipse":
        this.formatToEllipse(id)
        break
      case "Rectangular":
        this.formatToRectangular(id)
        break
      case "LeftConcave":
        this.formatToLeftConcave(id)
        break
      case "LowerConcave":
        this.formatToLowerConcave(id)
        break
      case "UpperConcave":
        this.formatToUpperConcave(id)
        break
      case "RightConcave":
        this.formatToRightConcave(id)
        break
      case "MainDiagonalConcave":
        this.formatToMainDiagonalConcave(id)
        break
      case "SecondaryDiagonalConcave":
        this.formatToSecondaryDiagonalConcave(id)
        break
      default:
        break
    }
  }

  /*private createBlockOptionsDiv(): any {
    const blipsDiv = document.createElement('div')
    blipsDiv.setAttribute(
      'class',
      DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT
    )
    return blipsDiv
  }

  menuOptionElementHandle(id: string, shape: Shapes) {
    // Adicionar o formato do bloco no campo flow
  }

  private addChangeFormatOptionOnBlockById(id: string) {
    const menuOptionsList = document.querySelector(
      `${BUILDER_HTML_BLOCK_TAG}#${id} .${BUILDER_HTML_MENU_BLOCK_CLASS} .${BUILDER_HTML_MENU_BLOCK_LIST_CLASS}`
    )
    const menuOptionElement = this.createBlockOptionsDiv()
    ReactDOM.render(
      <MenuBlockOption
        value="Alterar formato"
        onClick={this.menuOptionElementHandle}
        id={id}
      />,
      menuOptionElement
    )
    menuOptionsList.appendChild(menuOptionElement)
  }*/

  public handle() {
    console.log("Mudando o formato dos blocos")
    const blocks = getBlocks()
    for (let block of blocks) {
      console.log(block.id)
      if (block.addonsSettings && block.addonsSettings.shape) {
        console.log(block.addonsSettings.shape)
        this.format(block.addonsSettings.shape, block.id)
      }
    }
    return true
  }

  public cleanup() {
    return
  }
}
