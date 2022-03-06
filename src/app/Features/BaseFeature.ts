import { constantCase } from 'constant-case'

export abstract class BaseFeature {
  public static shouldRunOnce = false
  public static hasRun = false
  public static isCleaned = false
  public static alwaysClean = false
  public static isUserTriggered = false

  constructor() {
    // ...
  }

  /**
   * Returns if the feature can run
   */
  public static get canRun() {
    return this.shouldRunOnce ? !this.hasRun : true
  }

  /**
   * Returns the code of the feature
   */
  public static get code() {
    return constantCase(this.name)
  }

  /**
   * The code for handling the feature
   */
  public abstract handle(...args: any[]): void

  /**
   * The code for cleaning up the feature
   */
  public cleanup() {
    // ...
  }
}
