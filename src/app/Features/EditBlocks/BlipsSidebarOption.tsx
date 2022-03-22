import * as React from 'react';
import { BdsSelectOption } from 'blip-ds/dist/blip-ds-react';

import { Block } from '~/Components';

export type BlipsSidebarOptionProps = {
  id: string;
  onClick: () => void;
};

export const BlipsSidebarOption = ({
  id,
  onClick,
}: BlipsSidebarOptionProps): JSX.Element => {
  return (
    <div className="sidebar-content-body">
      <Block padding={2.5}>
        <BdsSelectOption value={null} ></BdsSelectOption>
      </Block>
    </div>
  );
};
