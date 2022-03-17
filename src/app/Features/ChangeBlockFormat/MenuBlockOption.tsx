import * as React from 'react'
import { Shapes } from '~/Enums'

export type MenuBlockOptionProps = {
  value: string,
  id: string,
  shape: Shapes,
  onClick: (id: string) => any
}

export const  MenuBlockOption = ({ value, id, shape, onClick }: MenuBlockOptionProps) => {
  return (
    <div>
        <span onClick={onClick(id)}>{value}</span>
    </div> 
  )
}