import * as React from 'react'
import { BdsInput } from 'blip-ds/dist/blip-ds-react'

export type InputProps = {
  label: string
  type: any
  value?: string
  onChange?: (e) => void
  onSubmit?: (e) => void
}

export const Input = ({
  label,
  type,
  value,
  onChange,
  onSubmit,
}: InputProps) => {
  const inputRef = React.useRef(null)

  return (
    <div className="relative">
      <BdsInput
        onBdsSubmit={onSubmit}
        onBdsChange={onChange}
        value={value}
        type={type}
        label={label}
        ref={inputRef}
      />
    </div>
  )
}
