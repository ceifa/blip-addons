import { BaseFeature } from './BaseFeature'

/**
 * This feature leaves the input in actions with the exact
 * same casing that the user typed.
 */
export class OriginalCaseInput extends BaseFeature {
  public handle() {
    const inputs = document.querySelectorAll('input.ttu')
    const listOfInputs = Array.from(inputs)

    for (const input of listOfInputs) {
      input.classList.remove('ttu')
    }
  }
}
