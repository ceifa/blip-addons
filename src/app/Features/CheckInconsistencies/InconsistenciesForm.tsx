import * as React from 'react';
import { BdsButton } from 'blip-ds/dist/blip-ds-react';

import { Paragraph, Block } from '~/Components';

import { TrackingsInconsistencies } from '@features/CheckInconsistencies/Trackings';
import { CheckLoopsOnFlow } from '@features/CheckInconsistencies/LoopsAndMaxBlocks';

const MAX_STATES_WITHOUT_INPUT = 35;

export const InconsistenciesForm = (): JSX.Element => {
  const [trackingsInconsistencies, setTrackingsInconsistencies] = React.useState();
  const [loopBlocksMessage, setLoopBlocksMessage] = React.useState();
  /**
   * Runs the 'CheckInconsistencies' fature, thus check for Inconsistencies on the flow
   */
  const handle = (): void => {
    setTrackingsInconsistencies(new TrackingsInconsistencies().handle(false));
    setLoopBlocksMessage(new CheckLoopsOnFlow().handle());
  };

  /*
  Adicionar um checkbox com quais inconsistencias gostaria que fossem verificadas
  */
  return (
    <>
      <Paragraph>Este recurso irá procurar por</Paragraph>
      <br />
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

        <Block paddingX={2.5} paddingY={1}>
          <Paragraph>Loops no Fluxo</Paragraph>
          {loopBlocksMessage}
        </Block>

        <Block paddingX={2.5} paddingY={1}>
          {trackingsInconsistencies}
        </Block>
      </Block>
    </>
  );
};
