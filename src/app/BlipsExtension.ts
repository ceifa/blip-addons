import { GetVariable } from './Commands'
import { Resolver } from './Resolver'
import type { BlipResponse, Message } from './types'

const LISTENER_SCRIPT = chrome.extension.getURL('/js/listener.js')

export class BlipsExtension {
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
  private onMessage(message: Message<BlipResponse>) {
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
  public onBuilderReady(callback: Function) {
    const interval = setInterval(async () => {
      const isLoading = await GetVariable.execute('isLoading')
      const isReady = isLoading === false

      if (isReady) {
        callback()
        clearInterval(interval)
      }
    })
  }

  /**
   * Starts the Blips extension
   */
  public start() {
    window.addEventListener('message', (message) => this.onMessage(message))

    return this
  }
}
