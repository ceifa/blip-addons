import * as React from 'react'
import { AccordionItem } from '@chakra-ui/react'

export type AccordionItemProps = {
  isFocusable?: boolean
  borderTop?: number,
  children: any
}

export const BlipAccordionItem = (
  { isFocusable = false, borderTop, children }: AccordionItemProps
) => {
  return (
    <>
      <AccordionItem isFocusable={isFocusable} borderTop={borderTop}>
        {children}
      </AccordionItem>
    </>
  )
}
