import * as React from 'react';
import { BdsButton, BdsIcon } from 'blip-ds/dist/blip-ds-react';
import { v4 as uuid } from 'uuid';
import { setSettings, Settings } from '~/Settings';
import {
  Block,
  Flex,
  HorizontalStack,
  Input,
  Paragraph,
  Stack,
  Title,
  BlipAccordion,
  BlipAccordionItem,
  BlipAccordionHeader,
  BlipAccordionButton,
  BlipAccordionBody,
} from '@components';

const NOT_EMPTY_REGEX = /.+/i;

const EmptySnippets = (): JSX.Element => {
  return (
    <Block
      borderRadius="5px"
      borderColor="rgba(0, 0, 0, 0.2)"
      borderStyle="dashed"
      borderWidth="1px"
    >
      <Stack padding={2}>
        <BdsIcon size="xxx-large" theme="outline" name="warning" />
        <Block marginTop={1}>
          <Title>Ainda não há nenhum snippet</Title>
        </Block>
        <Paragraph>Você ainda não adicionou nenhuma Snippet</Paragraph>
      </Stack>
    </Block>
  );
};

export const SnippetsConfig = (): JSX.Element => {
  const [personalSnippets, setPersonalSnippets] = React.useState(
    Settings.personalSnippets
  );
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    chrome.storage.sync.get('settings', ({ settings }) => {
      setPersonalSnippets(settings.personalSnippets || []);
    });
  }, []);

  const updateSettings = (): void => {
    const hasError = personalSnippets.find(
      (snippet) =>
        !NOT_EMPTY_REGEX.test(snippet.key) &&
        !NOT_EMPTY_REGEX.test(snippet.value)
    );
    if (hasError) {
      const toast = document.createElement('bds-toast');

      document.querySelector('.toast-container').appendChild(toast);

      toast.create({
        buttonText: 'Ok',
        actionType: 'icon',
        buttonAction: 'close',
        toastText: 'Todos os snippets devem ter um conteúdo não vazio',
        toastTitle: 'Falha ao salvar os Snippets!',
        variant: 'warning',
        duration: 0,
        position: 'top-right',
      });

      return;
    }

    chrome.storage.sync.set({
      settings: {
        personalSnippets,
      },
    });

    setSettings({
      personalSnippets,
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

  const getSnippetLine = (): JSX.Element => {
    return (
      <div>
        {personalSnippets.length === 0 && <EmptySnippets />}

        <Block paddingX={2.5} paddingY={1}>
          <BlipAccordion>

          {personalSnippets.map((field, index) => {
          return (
              <BlipAccordionItem borderTop={0} key={uuid()}>
                <BlipAccordionHeader>
                  <BlipAccordionButton title={field.key || "Novo Snippet"} />
                </BlipAccordionHeader>
                <BlipAccordionBody>
                  <Flex gap={1} style={{ marginBottom: '12px' }}>
                    <div style={{ width: '95%' }}>
                      <Input
                        value={field.key}
                        onChange={(e) => (field.key = e.target.value)}
                        errorMessage={error[index]}
                        label="Nome do Snippet"
                        type="text"
                      />

                      <div className="ml2" style={{ marginTop: '4px' }}>
                        <Input
                          value={field.value}
                          onChange={(e) => (field.value = e.target.value)}
                          errorMessage={error[index]}
                          label="Código a ser gerado"
                          type="text"
                          isTextarea={true}
                          rows={5}
                        />
                      </div>
                    </div>

                    <div style={{ alignSelf: 'center' }}>
                      <BdsIcon
                        name="trash"
                        color="red"
                        onClick={() => removeLine(index)}
                      />
                    </div>
                  </Flex>
                </BlipAccordionBody>
              </BlipAccordionItem>
          );
        })}

          </BlipAccordion>
        </Block>

      </div>
    );
  };

  /**
   * add a new line in the personalSnippets list
   *
   */
  const addNewLine = (): void => {
    setPersonalSnippets([...personalSnippets, { key: '', value: '' }]);
  };

  /**
   * remove a line in the personalSnippets list
   *
   * @param index The index of personalSnippets list
   */
  const removeLine = (index: number): void => {
    setError([]);
    setPersonalSnippets(personalSnippets.filter((_, i) => i !== index));
  };

  /**
   * Get the empties personal Snippets in the list
   *
   * @param personalSnippets The snippet that will be setted
   */
  const getEmptySnippets = (personalSnippets: any): any[] => {
    return personalSnippets.filter(
      (currentSnippet) =>
        currentSnippet.key === '' || currentSnippet.value === ''
    );
  };

  /**
   * Check for empty values in personalSnippets list
   *
   * @param personalSnippets The snippet that will be setted
   */
  const hasKeyOrValueEmpty = (personalSnippets: any): boolean => {
    const emptyExtras = getEmptySnippets(personalSnippets);

    return emptyExtras.length > 0;
  };

  /**
   * Transform a list with key and value element in a object {key: value}
   *
   * @param previousSnippet previous value in personalSnippets array
   * @param currentSnippet current value in personalSnippets array
   */
  const listToObject = (previousSnippet: any, currentSnippet: any): any => {
    return { ...previousSnippet, [currentSnippet.key]: currentSnippet.value };
  };

  /**
   * Set an error message in the empty lines
   *
   * @param personalSnippets The snippet that will be setted
   */
  const setErrorFields = (personalSnippets: any): string[] => {
    const errorMessage = 'Preencha todos os campos';
    const emptySnippetsIndexs = personalSnippets.map((extra, index) => {
      if (extra.key === '' || extra.value === '') {
        return index;
      }
    });

    const arrayOfErrors = new Array(personalSnippets.length);
    emptySnippetsIndexs.forEach((snippetIndex) => {
      arrayOfErrors[snippetIndex] = errorMessage;
    });

    return arrayOfErrors;
  };

  return (
    <Block>
      <Paragraph>Adicione aqui os seus snippets personalizados!</Paragraph>

      <Block marginTop={2} marginBottom={2}>
        {getSnippetLine()}

        <HorizontalStack marginTop={2}>
          <BdsButton variant="dashed" onClick={addNewLine}>
            Add Snippet
          </BdsButton>

          <BdsButton type="submit" variant="primary" onClick={updateSettings}>
            Salvar
          </BdsButton>
        </HorizontalStack>
      </Block>
    </Block>
  );
};
