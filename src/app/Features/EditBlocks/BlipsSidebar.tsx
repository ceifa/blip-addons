import * as React from 'react';
import {
  Block,
  BlipAccordion,
  BlipAccordionItem,
  BlipAccordionHeader,
  BlipAccordionButton,
  BlipAccordionBody,
} from '~/Components';
import { getBlockById } from '~/Utils';
import { ColorBlockOption } from './ChangeBlockColor';
import { ShapeBlockOption } from './ChangeBlockFormat';

export type BlipsSidebarProps = {
  id: string;
  onEditBackgorundColor: (id: string, color: string) => void;
  onEditTextColor: (id: string, color: string) => void;
  onEditShape: (id: string, shape: string) => void;
  onClose: () => void;
};

export const BlipsSidebar = ({
  id,
  onEditBackgorundColor,
  onEditTextColor,
  onEditShape,
  onClose,
}: BlipsSidebarProps): JSX.Element => {
  const thisBlock = getBlockById(id);

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
              value="Configurações do Bloco"
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
              <BlipAccordionItem borderTop={0}>
                <BlipAccordionHeader marginBottom={5}>
                  <BlipAccordionButton title="Alterar formato do Bloco" />
                </BlipAccordionHeader>
                <BlipAccordionBody>
                  <ShapeBlockOption id={id} onClick={onEditShape} />
                </BlipAccordionBody>
              </BlipAccordionItem>

              <BlipAccordionItem>
                <BlipAccordionHeader marginTop={5} marginBottom={5}>
                  <BlipAccordionButton title="Alterar cor do bloco" />
                </BlipAccordionHeader>
                <BlipAccordionBody>
                  <ColorBlockOption
                    defaultColor={thisBlock.addonsSettings?.backgroundColor}
                    id={id}
                    onSetColor={onEditBackgorundColor}
                  />
                </BlipAccordionBody>
              </BlipAccordionItem>

              <BlipAccordionItem>
                <BlipAccordionHeader marginTop={5} marginBottom={5}>
                  <BlipAccordionButton title="Alterar cor do titulo do bloco" />
                </BlipAccordionHeader>
                <BlipAccordionBody>
                  <ColorBlockOption
                    defaultColor={thisBlock.addonsSettings?.textColor}
                    id={id}
                    onSetColor={onEditTextColor}
                  />
                </BlipAccordionBody>
              </BlipAccordionItem>
            </BlipAccordion>
          </Block>
        </div>
      </div>
    </>
  );
};
