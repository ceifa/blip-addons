import { Storage } from './Storage'
import * as Commands from './Commands'
import type { Message, BlipsRequest, BlipResponse, Command } from './types'

Object.values(Commands).forEach(Storage.add)

window.addEventListener('message', async (message: Message<BlipsRequest>) => {
  if (isBlipRequest(message.data)) {
    const Command: any = Storage.get(message.data.commandCode)

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

const isBlipRequest = (request: BlipsRequest) => !!request.isBlipsRequest
const isCommand = (command: Command) => command
