import * as React from 'react';

import {
  UpperConcave,
  Rectangular,
  MainDiagonalConcave,
  SecondaryDiagonalConcave,
  RightConcave,
  LeftConcave,
  LowerConcave,
  Ellipse,
} from '@components/Shapes';
import { Shapes } from '~/BlipBlocksFunctions';

export type ShapeBlockOptionProps = {
  id: string;
  onClick: (id: string, shape: Shapes) => any;
};

export const ShapeBlockOption = ({
  id,
  onClick,
}: ShapeBlockOptionProps): JSX.Element => {
  return (
    <div>
      <Ellipse onClick={() => onClick(id, Shapes.ELLIPSE)} />
      <UpperConcave onClick={() => onClick(id, Shapes.UPPER_CONCAVE)} />
      <LowerConcave onClick={() => onClick(id, Shapes.LOWER_CONCAVE)} />
      <RightConcave onClick={() => onClick(id, Shapes.RIGHT_CONCAVE)} />
      <LeftConcave onClick={() => onClick(id, Shapes.LEFT_CONCAVE)} />
      <MainDiagonalConcave
        onClick={() => onClick(id, Shapes.MAIN_DIAGONAL_CONCAVE)}
      />
      <SecondaryDiagonalConcave
        onClick={() => onClick(id, Shapes.SECONDARY_DIAGONAL_CONCAVE)}
      />
      <Rectangular onClick={() => onClick(id, Shapes.RECTANGULAR)} />
    </div>
  );
};
