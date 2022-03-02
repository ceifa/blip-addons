import * as React from 'react'
import { BdsInput } from 'blip-ds/dist/blip-ds-react'

export type InputProps = {
  label: string
  type: any
  value?: string
  onChange?: (e) => void
}

export const Input = ({ label, type, value, onChange }: InputProps) => {
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    const { current } = inputRef

    current.addEventListener('bdsChange', onChange)

    return () => current.removeEventListener('bdsChange', onChange)
  }, [])

  return (
    <div className="relative">
      <BdsInput value={value} type={type} label={label} ref={inputRef} />
    </div>
  )
}
