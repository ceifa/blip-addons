import styled from '@emotion/styled'

export type Stack = Partial<{
  marginTop: number
  padding: number
}>

export const Stack = styled.div(({ marginTop = 0, padding }: Stack) => ({
  display: 'flex',
  padding: `${padding}rem`,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: `${marginTop}rem`,
}))
