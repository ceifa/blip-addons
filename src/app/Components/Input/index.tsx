import * as React from 'react';
import { BdsInput } from 'blip-ds/dist/blip-ds-react';

export type InputProps = {
  label: string;
  type: any;
  value?: any;
  onChange?: (e) => void;
  onSubmit?: (e) => void;
  errorMessage?: string;
  helperMessage?: string;
};

export const Input = ({
  label,
  type,
  value,
  onChange,
  onSubmit,
  errorMessage,
  helperMessage,
}: InputProps): JSX.Element => {
  return (
    <div className="relative">
      <BdsInput
        onBdsSubmit={onSubmit}
        onBdsChange={onChange}
        value={value}
        type={type}
        label={label}
        errorMessage={errorMessage}
        danger={!!errorMessage}
        helperMessage={helperMessage}
      />
    </div>
  );
};
