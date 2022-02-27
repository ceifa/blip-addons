import { BaseFeature } from './BaseFeature'

export class BuilderTitle extends BaseFeature {
  public static alwaysClean = true

  public get botName() {
    const botNameElement = document.querySelector('.bot-name:nth-child(1)')

    return botNameElement.innerHTML
  }

  public get isBeholder() {
    return Array.from(document.querySelectorAll('iframe')).find((iFrame) =>
      iFrame.getAttribute('src').includes('beholder')
    )
  }

  public handle() {
    const botName = this.botName

    document.title = `${botName} - Blip`
  }

  public cleanup() {
    if (this.isBeholder) {
      document.title = 'Beholder - Blip'
    } else {
      document.title = 'Blip Portal'
    }
  }
}
