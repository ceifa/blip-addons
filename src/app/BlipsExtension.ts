import { GetVariable } from './Commands'
import { Resolver } from './Resolver'
import * as Features from './Features'
import type { Message } from './types'
import { requestFeature } from './Utils'

const LISTENER_SCRIPT = chrome.extension.getURL('/js/listener.js')
const MINIMAL_INTERVAL = 200
const MAXIMUM_INTERVAL = 1500

export class BlipsExtension {
  public onReadyCallback: () => any

  constructor() {
    this.injectScript()
  }

  /**
   * Injects the script into the page
   */
  private injectScript() {
    const script = document.createElement('script')

    script.setAttribute('src', LISTENER_SCRIPT)
    document.body.appendChild(script)

    return this
  }

  /**
   * Listens for messages
   *
   * @param message The message
   */
  private onMessage(message: Message<any>) {
    const { isBlipsResponse, identifier, result } = message.data
    const isWaitingToBeResolved = Resolver.isWaiting(identifier)

    if (isBlipsResponse && isWaitingToBeResolved) {
      Resolver.resolve(identifier, result)
    }
  }

  /**
   * Executes the callback when the Builder is ready
   *
   * @param callback The callback
   */
  public onBuilderLoad(callback: () => any) {
    this.onReadyCallback = callback

    // Starts with the minimal interval
    let interval = MINIMAL_INTERVAL

    setInterval(async () => {
      const isLoading = await GetVariable.execute('isLoading')
      const isReady = isLoading === false

      if (isReady) {
        this.onReadyCallback()

        /**
         * Once the 'onReadyCallback' was already executed
         * increases the interval time to reduce CPU and
         * memory usages
         */
        interval = MAXIMUM_INTERVAL
      } else {
        this.cleanFeatures()
        interval = MINIMAL_INTERVAL
      }
    }, interval)
  }

  /**
   * Runs all features
   */
  public runFeatures() {
    Object.values(Features)
      .filter((Feature) => !Feature.isUserTriggered)
      .forEach((Feature) => requestFeature(Feature.code, 'run'))
  }

  /**
   * Request cleanup of all features
   */
  public cleanFeatures() {
    Object.values(Features).forEach((Feature) =>
      requestFeature(Feature.code, 'cleanup')
    )
  }

  /**
   * Starts the Blips extension
   */
  public start() {
    window.addEventListener('message', (message) => this.onMessage(message))

    return this
  }
}
