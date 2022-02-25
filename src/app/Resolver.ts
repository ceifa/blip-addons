export class Resolver {
  /**
   * The resolvers
   */
  public static resolvers = new Map<string, Function>()

  /**
   * Returns if the resolver associated to identifier is still waiting
   *
   * @param identifier The identifier
   */
  public static isWaiting(identifier: string) {
    return this.resolvers.has(identifier)
  }

  /**
   * Register a resolver
   *
   * @param identifier The identifier
   * @param resolve The resolver
   */
  public static register(identifier: string, resolve: Function) {
    this.resolvers.set(identifier, resolve)

    return this
  }

  /**
   * Resolves the order
   *
   * @param identifier The identifeir
   */
  public static resolve(identifier: string, result: any) {
    const isRegistered = this.resolvers.has(identifier)

    if (isRegistered) {
      const resolve = this.resolvers.get(identifier)

      resolve(result)
      this.resolvers.delete(identifier)
    }

    return this
  }
}
