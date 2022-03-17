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

export type BlipsResponse = {
  isBlipsResponse: boolean
  identifier: string
  result: unknown
}

export type Command = {
  new (): BaseCommand
} & typeof BaseCommand

export type FeatureRequest = {
  code: string
  type: 'run' | 'cleanup'
  isFeatureRequest: boolean
  args: any[]
}

export type BlipsCopy = {
  isCopyFromBlips: boolean
  blocksCode: string
  originBot: string
}

export type SettingsUpdate = {
  isSettingsUpdate: true
  newSettings: Record<string, any>
  isFromClient: boolean
}

export type Handshake = {
  isHandshake: boolean
}

export type Snippet = {
  label: string
  kind: any
  documentation: string
  insertText: string
}