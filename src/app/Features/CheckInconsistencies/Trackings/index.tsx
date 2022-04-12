import { BaseFeature } from '../../BaseFeature';
import { getBlocks, showSuccessToast } from '~/Utils';
import { ConditionViewModel } from '~/types';
import { Paragraph } from '@components';
import * as React from 'react';
import { BdsButton } from 'blip-ds/dist/blip-ds-react';

const TRACKING_ACTION_NAME = 'TrackEvent';
const EMPTY_STRING = '';
const EMPTY_REACT_TEMPLATE = <></>;

export class TrackingsInconsistencies extends BaseFeature {
  // public static isUserTriggered = true
  // public static shouldRunOnce = true;
  /**
   * Check for Inconsistencies on the flow
   */
  public handle(hasToSetVariable: boolean): any {
    const blocks = getBlocks();
    let trackingActions = [];
    const trackingsWithProblems = [];

    for (const block of blocks) {
      trackingActions = getTrackingEventActions(block);

      if (hasTrackEvent(trackingActions)) {
        for (const action of trackingActions) {
          if (actionCanBeNull(action)) {
            trackingsWithProblems.push(action);
            if (hasToSetVariable) {
              setVariableExistingCondition(action);
            }
          }
        }
      }
    }

    if (trackingsWithProblems.length > 0 && !hasToSetVariable) {
      return {
        trackingMessage: this.getTrackingMessage(trackingsWithProblems),
        hasTrackings: true,
      };
    } else {
      return {
        trackingMessage: EMPTY_REACT_TEMPLATE,
        hasTrackings: false,
      };
    }
  }

  private handleSubmit = (): void => {
    this.handle(true);
    showSuccessToast('Trackings Corrigidas!');
  };

  private getTrackingMessage = (list: string[]): any => {
    return (
      <>
        <h4>Trackings</h4>
        {this.getHtmlList(list)}

        <Paragraph>
          * Você deve alterar as condições de execução de trackings destes
          blocos para evitar o possíveis erros.
          <br />
          Você pode arrumar esses fluxos automaticamente apertando no botão
          abaixo.
        </Paragraph>

        <BdsButton type="submit" variant="primary" onClick={this.handleSubmit}>
          Definir
        </BdsButton>
      </>
    );
  };

  private getHtmlList = (list: any[]): any => {
    return (
      <ul
        style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#607b99' }}
      >
        {list.map((text, index) => (
          <li key={index}>{text['$title']}</li>
        ))}
      </ul>
    );
  };
}

const actionCanBeNull = (action: any): boolean => {
  const conditionVariable = getTrackingActionVariable(action);

  if (hasConditionVariable(conditionVariable)) {
    const processedConditionVariable = conditionVariable
      .replace('}}', '')
      .replace('{{', '');

    if (action.conditions.length === 0) {
      return true;
    }

    if (
      processedConditionVariable === 'input.content' &&
      !!action.conditions.find((x) => x.source === 'input')
    ) {
      return false;
    }

    return !action.conditions.find(
      (x) => x.variable === processedConditionVariable
    );
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
    return trackingActionVariable[0];
  }

  return EMPTY_STRING;
};

const hasTrackEvent = (trackingActions: any): boolean =>
  trackingActions.length !== 0;
const isTracking = (action: any): boolean =>
  action.type === TRACKING_ACTION_NAME;
const hasConditionVariable = (conditionVariable: any): boolean =>
  conditionVariable !== EMPTY_STRING;
