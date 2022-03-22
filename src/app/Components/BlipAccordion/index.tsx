import * as React from 'react'
import { ChakraProvider, Accordion } from '@chakra-ui/react'

export const BlipAccordion = (props: any) => {
  return (
    <>
      <ChakraProvider>
        <Accordion allowMultiple>
          {props.children}
        </Accordion>
      </ChakraProvider>
    </>
  )
}
