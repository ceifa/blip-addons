import styled from '@emotion/styled';

export const Rectangular = styled.div`
  background: #3f7de8;
  display: inline-block;
  border-radius: 3px;
  height: 12px;
  width: 12px;
  margin-right: 1rem;
  border: 1px solid black;
`;

export const Ellipse = styled(Rectangular)`
  border-radius: 50%;
`;

export const UpperConcave = styled(Rectangular)`
  border-radius: 50% 50% 0 0;
`;

export const LowerConcave = styled(Rectangular)`
  border-radius: 0 0 50% 50%;
`;

export const LeftConcave = styled(Rectangular)`
  border-radius: 50% 0 0 50%;
`;

export const RightConcave = styled(Rectangular)`
  border-radius: 0 50% 50% 0;
`;

export const SecondaryDiagonalConcave = styled(Rectangular)`
  border-radius: 0 50% 0 50%;
`;

export const MainDiagonalConcave = styled(Rectangular)`
  border-radius: 50% 0 50% 0;
`;
