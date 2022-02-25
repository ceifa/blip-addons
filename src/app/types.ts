import { BaseCommand } from './Commands/BaseCommand'

export type Message<Type = unknown> = {
  data: Type
}

export type BlipsRequest = {
  identifier: string
  isBlipsRequest: boolean
  commandCode: string
  args: any[]
}

export type BlipResponse = {
  isBlipsResponse: boolean
  identifier: string
  result: unknown
}

export type Command = {
  new (): BaseCommand
} & typeof BaseCommand
