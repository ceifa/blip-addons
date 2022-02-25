import { BaseCommand } from "./Commands/BaseCommand";

export class Storage {
  private static store: typeof BaseCommand[] = [];

  /**
   * Returns the comand with the given code
   *
   * @param code The code
   */
  public static get(code: string) {
    return this.store.find((Command) => Command.code === code);
  }

  /**
   * Adds a new command
   *
   * @param Command The command
   */
  public static add(Command: typeof BaseCommand) {
    this.store.push(Command);

    return this;
  }
}
