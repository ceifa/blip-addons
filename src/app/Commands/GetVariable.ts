import { get } from "dot-prop";

import { Command } from "../decorators/Command";
import { Constants } from "../Constants";
import { BaseCommand } from "./BaseCommand";

@Command({
  code: "GET_VARIABLE",
})
export class GetVariable extends BaseCommand {
  /**
   * Returns the value of the variable
   *
   * @param variableName The variable
   */
  public handle(variableName: string): unknown {
    const isReady = !!window.angular;

    if (isReady) {
      const canvas = document.querySelector("#canvas");
      const bot = window.angular.element(canvas).controller();

      console.log({ bot, variableName, test: get(bot, "flow") });

      return get(bot, variableName);
    }

    return null;
  }
}
