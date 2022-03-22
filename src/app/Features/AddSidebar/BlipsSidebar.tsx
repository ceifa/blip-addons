import * as React from 'react'
import {
  Block,
  BlipAccordion,
  BlipAccordionItem,
  BlipAccordionHeader,
  BlipAccordionButton,
  BlipAccordionBody,
} from '~/Components'
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
        className="sidebar-content-component left-entrance-animation position-left builder-sidebar ng-enter"
      >
        <div className="sidebar-content-header background-text-dark-5 bp-c-white ph5 pt2">
          <div className="sidebar-helper-header">
            <input
              className="bp-c-white w-100 sidebar-title"
              id="sidebar-title"
              maxLength={50}
              type="text"
              name="nodeName"
              value="Blip Addons"
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
            <BlipAccordion>
              <BlipAccordionItem isFocusable={false} borderTop={0}>
                <BlipAccordionHeader marginBottom={5}>
                  <BlipAccordionButton
                    title="Adicionar inatividade global"
                    onFocus={{ outline: 'none' }}
                    onHover={{ bgColor: 'none' }}
                  />
                </BlipAccordionHeader>
                <BlipAccordionBody>
                  <GlobalInactivityForm />
                </BlipAccordionBody>
              </BlipAccordionItem>

              <BlipAccordionItem isFocusable={false}>
                <BlipAccordionHeader marginTop={5} marginBottom={5}>
                  <BlipAccordionButton
                    title="Adicionar trackings globais"
                    onFocus={{ outline: 'none' }}
                    onHover={{ bgColor: 'none' }}
                  />
                </BlipAccordionHeader>
                <BlipAccordionBody>
                  <GlobalTrackingsForm />
                </BlipAccordionBody>
              </BlipAccordionItem>
            </BlipAccordion>
          </Block>
        </div>
      </div>
    </>
  )
}
