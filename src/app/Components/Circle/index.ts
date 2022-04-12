import styled from '@emotion/styled';

export type CircleProps = {
  backgroundColor: string;
};

export const Circle = styled.div(({ backgroundColor }: CircleProps) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  backgroundColor,
}));
