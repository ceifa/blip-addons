import * as React from 'react';
import { BdsButton } from 'blip-ds/dist/blip-ds-react';

import {
    Paragraph,
    Block,
  } from '~/Components';

import { setSettings, Settings } from '~/Settings';
import { CheckInconsistencies } from '@features/CheckInconsistencies';

export const InconsistenciesForm = (): JSX.Element => {

  /**
   * Runs the 'CheckInconsistencies' fature, thus check for Inconsistencies on the flow
   */
  const handle = (): void => {
    new CheckInconsistencies().handle();
  };

  /*
  Adicionar um checkbox com quais inconsistencias gostaria que fossem verificadas
  */
  return (
    <>
      <Paragraph>
        Este recurso irá procurar por registros de eventos que podem ter a action vazia.
        <br />
        <b>Você ainda precisa publicar o fluxo</b>
      </Paragraph>

      <Block marginTop={2}>
          <BdsButton type="submit" variant="primary" onClick={handle}>
            Verificar
          </BdsButton>

        <Paragraph>
          * Remove o limite de espera de <b>TODOS</b> os inputs.
        </Paragraph>
      </Block>
    </>
  );
};
