import * as React from 'react'

import { BdsButton, BdsInput } from 'blip-ds/dist/blip-ds-react'

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
          <div className="sidebar-inner-content pa5">
            <span className="bp-fs-5 bp-c-city ttu b">
              Adicionar tempo de inatividade global
            </span>

            <p style={{ color: '#607b99', fontSize: '.875rem' }}>
              Todos os blocos que esperam por uma entrada do usuário terão seu
              limite de espera setados para o valor abaixo.
            </p>

            <div className="mt3">
              <BdsInput label="Limite de espera (em minutos)" type="number" />

              <div className="flex justify-between items-center mt3">
                <BdsButton variant="primary">Adicionar tempo</BdsButton>
                <BdsButton variant="delete">Remover</BdsButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
