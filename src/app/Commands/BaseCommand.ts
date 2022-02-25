export abstract class BaseCommand {
  /**
   * Code of the command
   */
  public static code = "";

  constructor() {}

  /**
   * Boots the command
   */
  public static boot() {
    this.code = "";
  }

  /**
   *
   */
  public abstract handle(...args: any[]): any | Promise<any>;
}
