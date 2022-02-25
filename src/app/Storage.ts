import { Command } from './types'

export class Storage {
  public static store: Command[] = []

  /**
   * Returns the comand with the given code
   *
   * @param code The code
   */
  public static get(code: string) {
    return Storage.store.find((Command) => Command.code === code)
  }

  /**
   * Adds a new command
   *
   * @param Command The command
   */
  public static add(Command: Command) {
    Storage.store.push(Command)

    return this
  }
}
