export enum Shapes {
  ELLIPSE = '50%',
  RECTANGULAR = '3px',
  LEFT_CONCAVE = '50% 0 0 50%',
  LOWER_CONCAVE = '0 0 50% 50%',
  UPPER_CONCAVE = '50% 50% 0 0',
  RIGHT_CONCAVE = '0 50% 50% 0',
  MAIN_DIAGONAL_CONCAVE = '50% 0 50% 0',
  SECONDARY_DIAGONAL_CONCAVE = '0 50% 0 50%',
}

export const formatShapeBlock = (shape: Shapes, block: any): void => {
  block.style.borderRadius = shape;
};
