import * as React from 'react';
import { BdsSwitch } from 'blip-ds/dist/blip-ds-react';

export type SwitchProps = {
  name: string;
  onChange: (arg: any) => void;
  isChecked: boolean;
};

export const Switch = ({
  name,
  onChange,
  isChecked,
}: SwitchProps): JSX.Element => {
  return (
    <BdsSwitch
      name={name}
      refer={name}
      checked={isChecked}
      onBdsChange={onChange}
    />
  );
};
