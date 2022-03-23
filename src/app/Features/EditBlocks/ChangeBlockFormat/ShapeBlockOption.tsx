import * as React from 'react';
import { BdsButton } from 'blip-ds/dist/blip-ds-react';
import EllipseIcon from "../../../../styles/Ellipse.svg";
import UpperConcaveIcon from "../../../../styles/Ellipse.svg";
import LowerConcaveIcon from "../../../../styles/Ellipse.svg";
import RightConcaveIcon from "../../../../styles/Ellipse.svg";
import LeftConcaveIcon from "../../../../styles/Ellipse.svg";
import MainDiagonalConcaveIcon from "../../../../styles/Ellipse.svg";
import SecondaryDiagonalConcaveIcon from "../../../../styles/Ellipse.svg";
import RectangularIcon from "../../../../styles/Ellipse.svg";

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
import { Shapes } from '../BlipBlocksFunctions';

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
      <BdsButton variant='ghost' onClick={() => onClick(id, Shapes.ELLIPSE)}> hehe <BdsButton/>
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
  )
};
