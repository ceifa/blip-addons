import { BaseFeature } from '../BaseFeature';
import { getBlocks, showSuccessToast, showWarningToast } from '~/Utils';
import { ConditionViewModel } from '~/types';

const TRACKING_ACTION_NAME = 'TrackEvent';
const EMPTY_STRING = '';

export class CheckInconsistencies extends BaseFeature {
  public static isUserTriggered = true;

  /**
   * Check for Inconsistencies on the flow
   */
  public handle(): void {
    const blocks = getBlocks();
    let trackingActions = [];
    const trackingsWithProblems = [];
    let hasInputExpiration;

    for (const block of blocks) {
      trackingActions = getTrackingEventActions(block);

      if (hasTrackEvent(trackingActions)) {
        hasInputExpiration = hasExpirationInput(block);
        for (const action of trackingActions) {
          if (actionCanBeNull(action, hasInputExpiration)) {
            trackingsWithProblems.push(action);
            setVariableExistingCondition(action);
          }
        }
      }
    }

    if (trackingsWithProblems.length > 0) {
      showWarningToast('Foi encontrado algum registro de evento que pode ser nulo');
    } else {
      showSuccessToast(`Não foi encontrada nenhuma inconsistência no fluxo`);
    }
  }
}

const actionCanBeNull = (action: any, hasInputExpiration: boolean): boolean => {
  const conditionVariable = getTrackingActionVariable(action);
  if (hasConditionVariable(conditionVariable)) {
    if (action.conditions.length === 0) {
      return true;
    }
    if (conditionVariable === 'input.content' && hasInputExpiration) {
      return !!action.conditions.find((x) => x.source === 'input');
    } else {
      return !!action.conditions.find((x) => x.variable === conditionVariable);
    }
  } else {
    return false;
  }
};

const setVariableExistingCondition = (action: any): void => {
  const conditionVariable = getTrackingActionVariable(action);

  if (hasConditionVariable(conditionVariable)) {
    const trackingVariable = conditionVariable
      .replace('{{', '')
      .replace('}}', '');

    const trackingCondition: ConditionViewModel = {
      comparison: 'exists',
      source: 'context',
      values: [],
      variable: trackingVariable,
    };
    action.conditions.push(trackingCondition);
  }
};

const getTrackingEventActions = (block: any): any => {
  return getAllActions(block).filter(isTracking);
};
const getAllActions = (block: any): any => [
  ...block.$enteringCustomActions,
  ...block.$leavingCustomActions,
];
const getTrackingActionVariable = (action: any): string => {
  const onlyVariableRegex = /^({{[\w@.]+}})$/i;
  const trackingActionVariable = onlyVariableRegex.exec(action.settings.action);

  if (trackingActionVariable) {
    return trackingActionVariable[0].toLowerCase();
  }

  return EMPTY_STRING;
};

const hasTrackEvent = (trackingActions: any): boolean => trackingActions.length !== 0;
const isTracking = (action: any): boolean => action.type === TRACKING_ACTION_NAME;
const hasConditionVariable = (conditionVariable: any): boolean => conditionVariable !== EMPTY_STRING;
const hasExpirationInput = (block): boolean => {
  const inputAction = block.$contentActions.find((contentAction) => contentAction['input']);
  return inputAction && !!inputAction.input.expiration;
};
