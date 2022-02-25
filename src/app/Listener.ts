import { Storage } from './Storage'
import * as Commands from './Commands'
import type {
  Message,
  BlipsRequest,
  BlipResponse,
  Command,
  FeatureRequest,
} from './types'
import * as Features from './Features'

Object.values(Commands).forEach(Storage.add)

window.addEventListener('message', async (message: Message<any>) => {
  if (isFeatureRequest(message.data)) {
    const { code, type } = message.data

    const Feature = Object.values(Features).find(
      (Feature) => Feature.code === code
    )

    if (type === 'run') {
      if (Feature.canRun) {
        await new Feature().handle()
        Feature.hasRun = true
      }
    } else {
      if (!Feature.isCleaned) {
        await new Feature().cleanup()
        Feature.isCleaned = true
      }
    }
  }

  if (isBlipRequest(message.data)) {
    const Command = Storage.get(message.data.commandCode)

    if (isCommand(Command)) {
      const { identifier, args } = message.data
      const result = await new Command().handle(...args)

      const response: BlipResponse = {
        isBlipsResponse: true,
        identifier,
        result,
      }

      window.postMessage(response, '*')
    }
  }
})

const isFeatureRequest = (request: any): request is FeatureRequest =>
  !!request.isFeatureRequest
const isBlipRequest = (request: any): request is BlipsRequest =>
  !!request.isBlipsRequest
const isCommand = (command: Command) => command
