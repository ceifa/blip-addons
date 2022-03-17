import { BdsIcon, BdsTooltip } from 'blip-ds/dist/blip-ds-react'
import * as React from 'react'

const INACTIVE_ICON = 'screen-full'
const ACTIVE_ICON = 'screen-fill'

export type BlipsCleanButtonProps = {
  clean: () => void
  undo: () => void
}

export const CleanButton = ({ clean, undo }: BlipsCleanButtonProps) => {
  const [isActive, setIsActive] = React.useState(false)
  const [icon, setIcon] = React.useState(INACTIVE_ICON)

  function onClick() {
    setIsActive(!isActive)
    setIcon(isActive ? ACTIVE_ICON : INACTIVE_ICON)

    if (isActive) {
      clean()
    } else {
      undo()
    }
  }

  return (
    <li>
    <BdsTooltip
      className="cursor-pointer"
      position="right-center"
      tooltipText="Blips"
      onClick={ onClick }
    >
      <div className="builder-icon-bg flex justify-center items-center">
        <BdsIcon
          size="medium"
          class="builder-icon bds-icon bds-icon__size--medium"
          theme="outline"
          name={icon}
        />
      </div>
    </BdsTooltip>
    </li>
  )
}
