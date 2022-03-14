import styled from '@emotion/styled'
import { Property } from 'csstype'

export type BlockProps = Partial<{
  marginTop: number
  marginLeft: number
  marginRight: number
  marginBottom: number
  padding: number
  borderStyle: Property.BorderStyle
  borderWidth: Property.BorderWidth
  borderColor: string
  borderRadius: Property.BorderRadius
}>

export const Block = styled.div(
  ({
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    padding = 0,
    borderStyle,
    borderWidth,
    borderColor,
    borderRadius,
  }: BlockProps) => ({
    marginTop: `${marginTop}rem`,
    marginBottom: `${marginBottom}rem`,
    marginLeft: `${marginLeft}rem`,
    marginRight: `${marginRight}rem`,
    padding: `${padding}rem`,
    borderStyle,
    borderWidth,
    borderColor,
    borderRadius,
  })
)
