import styled from '@emotion/styled'

export type BlockProps = Partial<{
  marginTop: number
  marginLeft: number
  marginRight: number
  marginBottom: number
  padding: number
}>

export const Block = styled.div(
  ({
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    padding = 0,
  }: BlockProps) => ({
    marginTop: `${marginTop}rem`,
    marginBottom: `${marginBottom}rem`,
    marginLeft: `${marginLeft}rem`,
    marginRight: `${marginRight}rem`,
    padding: `${padding}rem`,
  })
)
