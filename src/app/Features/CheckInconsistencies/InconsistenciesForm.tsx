import * as React from 'react';
import { BdsButton } from 'blip-ds/dist/blip-ds-react';

import { Paragraph, Block } from '~/Components';

import { TrackingsInconsistencies } from '@features/CheckInconsistencies/Trackings';
import { CheckLoopsOnFlow } from '@features/CheckInconsistencies/LoopsAndMaxBlocks';
import { showSuccessToast, showWarningToast } from '~/Utils';

const MAX_STATES_WITHOUT_INPUT = 35;

export const InconsistenciesForm = (): JSX.Element => {
  const [loopBlocksMessage, setLoopBlocksMessage] = React.useState();
  const [trackingInconsistenceMessage, setTrackingInconsistenceMessage] = React.useState();
  /**
   * Runs the 'CheckInconsistencies' fature, thus check for Inconsistencies on the flow
   */
  const handle = (): void => {
    new TrackingsInconsistencies().handle(false);
    const { loopMessage, hasLoop } = new CheckLoopsOnFlow().handle();
    const { trackingMessage, hasTrackings } =  new TrackingsInconsistencies().handle(false);

    setLoopBlocksMessage(loopMessage);
    setTrackingInconsistenceMessage(trackingMessage);

    if(hasLoop || hasTrackings){
      showWarningToast('Foi encontrada alguma inconsistência no fluxo.')
    } else {
      showSuccessToast('Não foi encontrada nenhuma inconsistência no fluxo.')
    }
  };

  /*
  Adicionar um checkbox com quais inconsistencias gostaria que fossem verificadas
  */
  return (
    <>
      <Paragraph>Este recurso irá procurar por</Paragraph>
      <ul style={{fontSize: "0.875rem", marginTop: "0.5rem", color: "#607b99"}}>
        <li>Registros de eventos que podem ter a action vazia</li>
        <li>Loops no fluxo</li>
        <li>
          Cascata de blocos com mais de {MAX_STATES_WITHOUT_INPUT} blocos sem
          entrada do usuário
        </li>
      </ul>

      <Block marginTop={2}>
        <BdsButton type="submit" variant="primary" onClick={handle}>
          Verificar
        </BdsButton>
      </Block>

      <Block paddingY={1}>
          {loopBlocksMessage}
      </Block>

      <Block paddingY={1}>
          {trackingInconsistenceMessage}
      </Block>
    </>
  );
};
