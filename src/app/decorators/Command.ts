import { BaseCommand } from "../Commands/BaseCommand";
import { Storage } from "../Storage";

export type CommandOptions = {
  code: string;
};

export function Command(options: CommandOptions) {
  return function decorateCommand(Command: typeof BaseCommand) {
    Command.boot();

    Command.code = options.code;

    Storage.add(Command);
  };
}
