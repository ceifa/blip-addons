import { getBotName } from '~/Utils'
import { BaseFeature } from '../BaseFeature'

const BEHOLDER_TAG = 'take-plugin-bot-beholder'

export class BuilderTitle extends BaseFeature {
  public static alwaysClean = true

  /**
   * Returns if the current page is Beholder
   */
  public get isBeholder() {
    const iFrames = Array.from(document.querySelectorAll('iframe'))

    return iFrames.find((iFrame) => {
      const source = iFrame.getAttribute('src')

      return typeof source === 'string' ? source.includes(BEHOLDER_TAG) : false
    })
  }

  /**
   * Adds title to builder
   */
  public handle() {
    const botName = getBotName()

    document.title = `${botName} - Blip`
  }

  /**
   * Adds title to other Blip pages
   */
  public cleanup() {
    if (this.isBeholder) {
      document.title = 'Beholder - Blip'
    } else {
      document.title = 'Blip Portal'
    }
  }
}
