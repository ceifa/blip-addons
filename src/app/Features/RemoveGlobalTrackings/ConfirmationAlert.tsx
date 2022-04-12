import * as React from 'react';
import {
  BdsAlert,
  BdsAlertBody,
  BdsAlertHeader,
  BdsAlertActions,
  BdsButton,
} from 'blip-ds/dist/blip-ds-react';

import { Flex } from '@components/Flex';

export type ConfirmationAlertProps = {
  onConfirm: (...args: any[]) => any;
  onCancel: (...args: any[]) => any;
};

export const ConfirmationAlert = ({
  onConfirm,
  onCancel,
}: ConfirmationAlertProps): JSX.Element => {
  return (
    <BdsAlert open>
      <BdsAlertHeader variant="delete" icon="warning">
        Atenção!
      </BdsAlertHeader>

      <BdsAlertBody>
        Você tem certeza que gostaria de executar esta ação? Isso irá alterar o
        fluxo definitivamente.
        <div style={{ color: '#607b99', marginTop: 8 }}>
          * Para desfazer esta ação recarregue a última versão publicada do
          fluxo.
        </div>
      </BdsAlertBody>

      <BdsAlertActions>
        <Flex gap={5}>
          <BdsButton variant="secondary" onClick={onCancel}>
            Cancelar
          </BdsButton>

          <BdsButton variant="delete" onClick={onConfirm}>
            Confirmar
          </BdsButton>
        </Flex>
      </BdsAlertActions>
    </BdsAlert>
  );
};
