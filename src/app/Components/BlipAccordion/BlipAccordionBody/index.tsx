import * as React from 'react'
import { AccordionPanel } from '@chakra-ui/react'

export const BlipAccordionBody = (props: any) => {
  return (
    <AccordionPanel>
        {props.children}
    </AccordionPanel>
  )
}
