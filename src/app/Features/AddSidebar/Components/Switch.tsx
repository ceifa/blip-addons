import * as React from 'react'
import { BdsSwitch } from 'blip-ds/dist/blip-ds-react'

export type SwitchProps = {
  name: string
  onChange: (arg: any) => void
  isChecked: boolean
}

export const Switch = ({ name, onChange, isChecked }: SwitchProps) => {
  const switchRef = React.useRef(null)

  return (
    <BdsSwitch
      name={name}
      refer={name}
      ref={switchRef}
      checked={isChecked}
      onBdsChange={onChange}
    />
  )
}
