import * as React from 'react';
import { BdsSelect, BdsSelectOption } from 'blip-ds/dist/blip-ds-react';

import * as Constants from './Constants';
import { Circle } from '@components/Circle';
import { Flex } from '@components/Flex';
import { Settings } from '~/Settings';

export type FilterProps = {
  onChange: (...args: any[]) => any;
};

export const Filter = ({ onChange }: FilterProps): JSX.Element => {
  return (
    <Flex gap={5}>
      <BdsSelect
        onBdsChange={onChange}
        label="Filtrar por ambiente"
        icon="filter"
        value={Constants.ALL}
      >
        <BdsSelectOption value="">
          <Flex alignItems="center" gap={10}>
            <Circle backgroundColor="black" />
            Todos
          </Flex>
        </BdsSelectOption>

        <BdsSelectOption value={Settings.prodKey}>
          <Flex alignItems="center" gap={10}>
            <Circle backgroundColor="#FB5A8B" />
            Produção (PRD)
          </Flex>
        </BdsSelectOption>

        <BdsSelectOption value={Settings.hmgKey}>
          <Flex alignItems="center" gap={10}>
            <Circle backgroundColor="#FFEC03" />
            Homologação (HMG)
          </Flex>
        </BdsSelectOption>

        <BdsSelectOption value={Settings.betaKey}>
          <Flex alignItems="center" gap={10}>
            <Circle backgroundColor="#C226FB" />
            Beta (BETA)
          </Flex>
        </BdsSelectOption>

        <BdsSelectOption value={Settings.devKey}>
          <Flex alignItems="center" gap={10}>
            <Circle backgroundColor="#21CC79" />
            Desenvolvimento (DEV)
          </Flex>
        </BdsSelectOption>
      </BdsSelect>
    </Flex>
  );
};
