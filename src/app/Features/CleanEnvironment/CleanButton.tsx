import * as React from 'react';
import { BdsIcon, BdsTooltip } from 'blip-ds/dist/blip-ds-react';

const INACTIVE_ICON = 'screen-full';
const ACTIVE_ICON = 'screen-fill';

export type BlipsCleanButtonProps = {
  clean: () => void;
  undo: () => void;
};

export const CleanButton = ({
  clean,
  undo,
}: BlipsCleanButtonProps): JSX.Element => {
  const [isActive, setIsActive] = React.useState(false);

  const handleClick = (): void => {
    setIsActive(!isActive);

    if (isActive) {
      clean();
    } else {
      undo();
    }
  };

  return (
    <li>
      <BdsTooltip
        className="cursor-pointer"
        position="right-center"
        tooltipText="Blips"
        onClick={handleClick}
      >
        <div className="builder-icon-bg flex justify-center items-center">
          <BdsIcon
            size="medium"
            class="builder-icon bds-icon bds-icon__size--medium"
            theme="outline"
            name={isActive ? ACTIVE_ICON : INACTIVE_ICON}
          />
        </div>
      </BdsTooltip>
    </li>
  );
};
