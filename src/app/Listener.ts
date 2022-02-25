import "./Commands";

import { Retriever } from "./Retriever";
import { Storage } from "./Storage";

window.addEventListener("message", async (message: Message<BlipsRequest>) => {
  if (message.data.isBlipsRequest) {
    const Command: any = Storage.get(message.data.commandCode);

    if (!!Command) {
      const { identifier, args } = message.data;

      console.log(args);

      const result = await new Command().handle.apply(this, args);

      window.postMessage(
        {
          isBlipsResponse: true,
          identifier,
          result,
        } as BlipResponse,
        "*"
      );

      Retriever.resolve(identifier, result);
    }
  }
});
