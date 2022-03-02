import { GetVariable } from './Commands'
import { Resolver } from './Resolver'
import * as Features from './Features'
import type { BlipsResponse, Message, SettingsUpdateRequest } from './types'
import { requestFeature, updateSettings } from './Utils'
import { Settings } from './Settings'

const LISTENER_SCRIPT = chrome.extension.getURL('/js/listener.js')
const MINIMAL_INTERVAL = 200
const MAXIMUM_INTERVAL = 1500

export class BlipsExtension {
  public onReadyCallback: () => any

  constructor() {
    this.setSettings()
    this.injectScript()
  }

  /**
   * Loads the user settings
   */
  private setSettings() {
    chrome.storage.sync.get('Settings', (result) => {
      Object.assign(Settings, result.Settings)
      chrome.storage.sync.set({ Settings })
    })

    updateSettings(Settings)
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
  private onMessage(message: Message<BlipsResponse>) {
    if (isBlipsResponse(message.data)) {
      const { identifier, result } = message.data
      const isWaitingToBeResolved = Resolver.isWaiting(identifier)

      if (isWaitingToBeResolved) {
        return Resolver.resolve(identifier, result)
      }

      return
    }

    /**
     * Determins if it's settings update request, if it's  update the
     * settings
     */
    if (isSettingsUpdateRequest(message.data)) {
      const { newSettings } = message.data

      chrome.storage.sync.get('Settings', (result) => {
        chrome.storage.sync.set({
          Settings: Object.assign(result.Settings, newSettings),
        })
      })

      Object.assign(Settings, newSettings)

      return
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

const isBlipsResponse = (request: any): request is BlipsResponse =>
  request.isBlipsResponse
const isSettingsUpdateRequest = (
  request: any
): request is SettingsUpdateRequest => request.isSettingsUpdateRequest
