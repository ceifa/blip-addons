import * as React from 'react'
import { Box } from '@chakra-ui/react'

export type BlipAccordionHeaderProps = {
  marginBottom?: number
  marginTop?: number
  children: any
}

export const BlipAccordionHeader = ({
  children,
  marginBottom,
  marginTop,
}: BlipAccordionHeaderProps) => {
  return (
    <>
      <h2>
        <Box mb={marginBottom} mt={marginTop} textAlign="left">
          {children}
        </Box>
      </h2>
    </>
  )
}
