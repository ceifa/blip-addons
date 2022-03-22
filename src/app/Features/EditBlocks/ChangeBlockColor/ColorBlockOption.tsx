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
  const [color, setColor] = React.useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  });

  const handleChange = (color): void => {
    setColor(color.rgb);
    onSetColor(id, color)
  };

  return (
    <div>
      <SketchPicker color={color} onChange={(color) => handleChange(color)} />
    </div>
  );
};