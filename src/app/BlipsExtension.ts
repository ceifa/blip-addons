import { GetVariable } from './Commands'
import { Resolver } from './Resolver'
import * as Features from './Features'
import type { FeatureRequest, Message } from './types'

const LISTENER_SCRIPT = chrome.extension.getURL('/js/listener.js')

const MINIMAL_INTERVAL = 200
const MAXIMUM_INTERVAL = 1500

export class BlipsExtension {
  public onReadyCallback: Function

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
  public onBuilderLoad(callback: Function) {
    this.onReadyCallback = callback

    let interval = MINIMAL_INTERVAL

    setInterval(async () => {
      const isLoading = await GetVariable.execute('isLoading')
      const isReady = isLoading === false

      if (isReady) {
        this.onReadyCallback()
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
    Object.values(Features).forEach((Feature) =>
      this.requestFeature(Feature.code, 'run')
    )
  }

  /**
   * Request cleanup of all features
   */
  public cleanFeatures() {
    Object.values(Features).forEach((Feature) =>
      this.requestFeature(Feature.code, 'cleanup')
    )
  }

  /**
   * Requests a feature
   *
   * @param code The code of the feature
   * @param type The type of the feature
   */
  public requestFeature(code: string, type: 'cleanup' | 'run') {
    const message: FeatureRequest = {
      isFeatureRequest: true,
      type,
      code,
    }

    this.sendMessage(message)
  }

  /**
   * Sends a message
   *
   * @param message The message
   */
  private sendMessage(message: any) {
    window.postMessage(message, '*')
  }

  /**
   * Starts the Blips extension
   */
  public start() {
    window.addEventListener('message', (message) => this.onMessage(message))

    return this
  }
}
