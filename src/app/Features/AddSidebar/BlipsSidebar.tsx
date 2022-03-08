import * as React from 'react'
import { BdsMenuSeparation } from 'blip-ds/dist/blip-ds-react'

import { Block } from '~/Components'
import { GlobalInactivityForm } from '@features/SetInactivity/GlobalInactivityForm'
import { GlobalTrackingsForm } from '@features/SetGlobalTrackings/GlobalTrackingsForm'

export type BlipsSidebarProps = {
  onClose: () => void
}

export const BlipsSidebar = ({ onClose }: BlipsSidebarProps) => {
  return (
    <>
      <div
        id="blips-custom-sidebar"
        className="sidebar-content-component right-entrance-animation position-right builder-sidebar ng-enter"
      >
        <div className="sidebar-content-header background-text-dark-5 bp-c-white ph5 pt2">
          <div className="sidebar-helper-header">
            <input
              className="bp-c-white w-100 sidebar-title"
              id="sidebar-title"
              maxLength={50}
              type="text"
              name="nodeName"
              value="Blips"
              readOnly
            />

            <div className="sidebar-helper-header__actions">
              <span>
                <i
                  className="icon-close cursor-pointer"
                  id="addictions-menu-close"
                  onClick={onClose}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="sidebar-content-body">
          <Block padding={2.5}>
            <GlobalInactivityForm />
            <BdsMenuSeparation />
            <GlobalTrackingsForm />
          </Block>
        </div>
      </div>
    </>
  )
}
