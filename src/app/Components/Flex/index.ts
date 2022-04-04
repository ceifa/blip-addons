import styled from '@emotion/styled';

export type FlowProps = Partial<{
  padding: number;
  marginTop: number;
}>;

export const Flex = styled.div(({ padding = 0, marginTop = 0 }: FlowProps) => ({
  display: 'flex',
  marginTop: `${marginTop}rem`,
  padding: `${padding}rem`,
}));
