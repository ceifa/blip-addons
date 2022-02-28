import { Command } from './types'

export class Storage {
  public static store = new Map<string, Command>()

  /**
   * Returns the comand with the given code
   *
   * @param code The code
   */
  public static get(code: string) {
    return Storage.store.get(code)
  }

  /**
   * Adds a new command
   *
   * @param Command The command
   */
  public static add(Command: Command) {
    Storage.store.set(Command.code, Command)

    return this
  }
}
