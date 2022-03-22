const SHAPES = {
  Ellipse: '50%',
  Rectangular: '0',
  LeftConcave: '50% 0 0 50%',
  LowerConcave: '0 0 50% 50%',
  UpperConcave: '50% 50% 0 0',
  RightConcave: '0 50% 50% 0',
  MainDiagonalConcave: '50% 0 50% 0',
  SecondaryDiagonalConcave: '0 50% 0 50%',
  default: '0',
}

export function formatShapeBlock(shape: string, block: any) {
  block.style.borderRadius = SHAPES[shape] ? SHAPES[shape] : SHAPES.default
}

export function colorBlockBackground(color: string, block: any) {
  block.style.background = color
}

/*export function colorBlockText(color: string, block: any) {
  block.style.color = color
}*/