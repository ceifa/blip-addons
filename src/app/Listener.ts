import * as RawCommands from './Commands'
import * as RawFeatures from './Features'
import type {
  Message,
  BlipsRequest,
  BlipsResponse,
  Command,
  FeatureRequest,
} from './types'

const Commands = Object.values(RawCommands)
const Features = Object.values(RawFeatures)

window.addEventListener('message', async (message: Message<any>) => {
  /**
   * Determine if it's a feature request, and properly runs
   * `handle` or `cleanup` functions
   */
  if (isFeatureRequest(message.data)) {
    const { code, type, args } = message.data
    const Feature = getFeature(code)

    /**
     * Runs the feature and update its states, as features may
     * have different settings
     */
    if (type === 'run') {
      if (Feature.canRun) {
        const featureInstance = new Feature()
        // eslint-disable-next-line prefer-spread
        await featureInstance.handle.apply(featureInstance, args)
        Feature.hasRun = true
        Feature.isCleaned = false
      }

      return
    }

    /**
     * As features actively change Blip's page, sometimes it's necessary
     * to undo the changes when user leaves the page.
     */
    if (type === 'cleanup') {
      const shouldRun = Feature.alwaysClean || !Feature.isCleaned

      if (shouldRun) {
        await new Feature().cleanup()
        Feature.isCleaned = true
      }

      return
    }
  }

  /**
   * Determine if it's a command request, if it's handles the
   * command and responds
   */
  if (isBlipsRequest(message.data)) {
    const Command: Command = getCommand(message.data.commandCode)

    if (isCommand(Command)) {
      const { identifier, args } = message.data
      const result = await new Command().handle(...args)

      sendResponse({
        identifier,
        result,
      })

      return
    }
  }
})

const isFeatureRequest = (request: any): request is FeatureRequest =>
  !!request.isFeatureRequest
const isBlipsRequest = (request: any): request is BlipsRequest =>
  !!request.isBlipsRequest
const isCommand = (command: Command) => command
const sendResponse = (message: Omit<BlipsResponse, 'isBlipsResponse'>) =>
  window.postMessage({ isBlipsResponse: true, ...message }, '*')
const getFeature = (code) => Features.find((Feature) => Feature.code === code)
const getCommand = (code) => Commands.find((Command) => Command.code === code)
