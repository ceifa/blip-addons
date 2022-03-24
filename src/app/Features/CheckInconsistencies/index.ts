import { BaseFeature } from '../BaseFeature';
import { getBlocks, showSuccessToast, showWarningToast } from '~/Utils';

const TRACKING_ACTION_NAME = 'TrackEvent';

export class CheckInconsistencies extends BaseFeature {
  public static isUserTriggered = true;

  /**
   * Check for Inconsistencies on the flow
   */
  public handle(): any {
    const blocks = getBlocks();

    let actions = [];
    const trackingsWithProblems = [] 
    let hasInputExpiration;

    for (const block of blocks) {
      actions = getActionsWithTrackingEvent(block);
      if(actions.length === 0){
        continue
      }
      console.log(`Actions do bloco ${block.id}`)
      console.log(actions)
      hasInputExpiration = hasExpirationInput(block)
      console.log(`Possui um input que expira: ${hasInputExpiration}`)
      for (const action of actions) {
        if(actionCanBeNull(action, hasInputExpiration)){
          console.log(`>>>> Actions do bloco ${block.id} com problema`)
          trackingsWithProblems.push(action)
        }
      }
    }

    console.log(`###### As trackingsWithProblems encontradas são: `)
    console.log(trackingsWithProblems)

    if (trackingsWithProblems.length > 0) {
      showWarningToast('Foi encontrado algum registro de evento que pode ser nulo');
    } else {
      showSuccessToast(`Não foi encontrada nenhuma inconsistência no fluxo`);
    }
  }
}

const getActionsWithTrackingEvent = (block: any): any => {
  return getAllActions(block).filter(isTracking);
};

const isTracking = (action: any): boolean =>
  action.type === TRACKING_ACTION_NAME;

const getAllActions = (block: any): any => [
  ...block.$enteringCustomActions,
  ...block.$leavingCustomActions,
];

const actionCanBeNull = (action: any, hasInputExpiration: boolean): boolean => {
  const onlyVariableRegex = /^({{[\w@.]+}})$/i;
  const trackingActionVariable = onlyVariableRegex.exec(action.settings.action);
  
  if (trackingActionVariable) {
    const conditionVariable = trackingActionVariable[0].toLowerCase();
    console.log(`A conditionVariable é ${conditionVariable}`)
    if(action.conditions.length === 0){
      return true
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

const hasExpirationInput = (block): boolean => {
  const inputAction = block.$contentActions.find((contentAction) => contentAction['input'])
  return inputAction && !!inputAction.input.expiration
}

/*
Quando eu verifico se uma variavel existe fica assim:
{
    "source": "context",
    "comparison": "exists",
    "values": [],
    "variable": "variavel2"
}

Quando verifico se a resposta do usuário existe fica assim:

{
  "$$hashKey": "object:1173",
  "source": "input",
  "comparison": "exists",
  "values": []
}
*/
