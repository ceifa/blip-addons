import * as React from 'react';
import { BdsButton } from 'blip-ds/dist/blip-ds-react';

import { setSettings, Settings } from '~/Settings';
import { Input } from '@components/Input';
import { Paragraph } from '@components/Paragraph';
import { Flex } from '@components/Flex';

export const KeywordsConfig = (): JSX.Element => {
  const [prodKey, setProdKey] = React.useState(Settings.prodKey);
  const [hmgKey, setHmgKey] = React.useState(Settings.hmgKey);
  const [betaKey, setBetaKey] = React.useState(Settings.betaKey);
  const [devKey, setDevKey] = React.useState(Settings.devKey);

  React.useEffect(() => {
    chrome.storage.sync.get('settings', ({ settings }) => {
      setProdKey(settings.prodKey);
      setHmgKey(settings.hmgKey);
      setBetaKey(settings.betaKey);
      setDevKey(settings.devKey);
    });
  }, []);

  const updateSettings = (): void => {
    setSettings({
      prodKey,
      hmgKey,
      betaKey,
      devKey,
    });

    const toast = document.createElement('bds-toast');

    document.querySelector('.toast-container').appendChild(toast);

    toast.create({
      buttonText: 'Ok',
      actionType: 'icon',
      buttonAction: 'close',
      toastText: 'Dados salvo com sucesso',
      toastTitle: 'Sucesso!',
      variant: 'success',
      duration: 0,
      position: 'top-right',
    });
  };

  return (
    <>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <Input
            helperMessage="Separe as palavras chaves por vírgula"
            label="Palavras chaves de PRODUÇÃO"
            type="text"
            value={prodKey}
            onChange={(e) => setProdKey(e.target.value)}
          />

          <Input
            helperMessage="Separe as palavras chaves por vírgula"
            label="Palavras chaves de HOMOLOGAÇÃO"
            type="text"
            value={hmgKey}
            onChange={(e) => setHmgKey(e.target.value)}
          />

          <Input
            helperMessage="Separe as palavras chaves por vírgula"
            label="Palavras chaves de BETA"
            type="text"
            value={betaKey}
            onChange={(e) => setBetaKey(e.target.value)}
          />

          <Input
            helperMessage="Separe as palavras chaves por vírgula"
            label="Palavras chaves de DESENVOLVIMENTO"
            type="text"
            value={devKey}
            onChange={(e) => setDevKey(e.target.value)}
          />

          <Paragraph>
            * Recarregue as páginas do builder abertas para carregar os novos
            snippets.
          </Paragraph>

          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <BdsButton onClick={updateSettings} type="submit">
              Salvar
            </BdsButton>
          </div>
        </div>
      </div>
    </>
  );
};
