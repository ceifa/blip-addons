import * as React from 'react';
import {
  BdsButton,
  BdsButtonIcon,
  BdsIcon,
  BdsTooltip,
} from 'blip-ds/dist/blip-ds-react';

import { KeywordsConfig } from './pages/KeywordConfig';
import { Flex } from '@components/Flex';
import { SnippetsConfig } from './pages/SnippetsConfig';

const Pages = {
  keywordConfig: {
    title: 'Configuração de palavra chave',
    component: <KeywordsConfig />,
  },
  SnippetsConfig: {
    title: 'Configuração dos snippets',
    component: <SnippetsConfig />,
  }
};

type Page = keyof typeof Pages | 'home';

export const App = (): JSX.Element => {
  const [page, setPage] = React.useState('home' as Page);

  const goTo = (page: Page) => () => setPage(page);

  if (page === 'home') {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ padding: 15 }}>
          <Flex alignItems="center" gap={10}>
            <BdsIcon color="black" name="settings-general" />
            <h2>Configurações</h2>
          </Flex>

          <div style={{ width: '80%', textAlign: 'left' }}>
            <h3>Recursos</h3>

            <BdsButton
              icon="filter"
              variant="secondary"
              onClick={goTo('keywordConfig')}
            >
              Configurar palavras-chaves de filtro
            </BdsButton>

            <BdsButton
              icon="file-java-script"
              variant="secondary"
              onClick={goTo('SnippetsConfig')}
            >
              Configurar Snippets
            </BdsButton>
          </div>
        </div>
      </div>
    );
  }

  const currentPage = Pages[page];

  return (
    <div style={{ position: 'relative', padding: 15 }}>
      <div
        className="toast-container"
        style={{
          position: 'absolute',
        }}
      ></div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <BdsTooltip position="right-center" tooltipText="Voltar">
          <BdsButtonIcon
            size="short"
            onClick={goTo('home')}
            variant="secondary"
            icon="arrow-left"
          />
        </BdsTooltip>

        <div style={{ width: '85%' }}>
          <h2>{currentPage.title}</h2>
        </div>
      </div>

      <div style={{ width: '80%', margin: '0 auto' }}>
        {currentPage.component}
      </div>
    </div>
  );
};
