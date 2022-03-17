import * as React from 'react'
import {
  UpperConcave,
  Rectangular,
  MainDiagonalConcave,
  SecondaryDiagonalConcave,
  RightConcave,
  LeftConcave,
  LowerConcave,
  Ellipse,
} from '@components/Shapes'

export type ShapeBlockOptionProps = {
  id: string
  onClick: (id: string, shape: string) => any
}

export const ShapeBlockOption = ({ id, onClick }: ShapeBlockOptionProps) => {
  return (
    <div>
      <Ellipse onClick={() => onClick(id, 'Ellipse')} />
      <UpperConcave onClick={() => onClick(id, 'UpperConcave')} />
      <LowerConcave onClick={() => onClick(id, 'LowerConcave')} />
      <RightConcave onClick={() => onClick(id, 'RightConcave')} />
      <LeftConcave onClick={() => onClick(id, 'LeftConcave')} />
      <MainDiagonalConcave onClick={() => onClick(id, 'MainDiagonalConcave')} />
      <SecondaryDiagonalConcave
        onClick={() => onClick(id, 'SecondaryDiagonalConcave')}
      />
      <Rectangular onClick={() => onClick(id, 'Rectangular')} />
    </div>
  )
}
