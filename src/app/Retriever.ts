import { v4 as guid } from "uuid";

export class Retriever {
  private static resolvers = new Map<string, Function>();

  public static resolve(id: string, result: unknown) {
    this.resolvers.get(id)(result);

    return this;
  }

  public static run(code: string, args: any[]) {
    return new Promise((resolve) => {
      const identifier = guid();

      this.resolvers.set(identifier, resolve);

      window.postMessage(
        {
          identifier,
          isBlipsRequest: true,
          commandCode: code,
          args,
        },
        "*"
      );
    });
  }
}
