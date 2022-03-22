import * as React from 'react';
import { SketchPicker, SwatchesPicker } from 'react-color';
import reactCSS from 'reactcss';
//import {} from '@components/Shapes';

export type ColorBlockOptionProps = {
  id: string,
  onSetColor: (id: string, color: string) => void;
};

export const ColorBlockOption = ({
  id,
  onSetColor
}: ColorBlockOptionProps): JSX.Element => {
  const [color, setColor] = React.useState({hex: "#ffffff"});

  const handleChange = (color): void => {
    setColor(color);
    onSetColor(id, color.hex)
  };

  return (
    <div>
      <SketchPicker color={color} onChange={handleChange} />
    </div>
  );
};