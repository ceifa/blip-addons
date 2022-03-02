import * as React from 'react'

import { BdsButton, BdsTypo } from 'blip-ds/dist/blip-ds-react'
import { Input } from './Components/Input'
import { Settings } from '../../Settings'
import { Switch } from './Components/Switch'

export type BlipsSidebarProps = {
  onClose: () => void
  onAdd?: (time: number, shouldKeep: boolean) => void
  onRemove?: () => void
}

export const BlipsSidebar = ({
  onClose,
  onAdd,
  onRemove,
}: BlipsSidebarProps) => {
  const [waitingTime, setWaitingTime] = React.useState(
    Settings.lastGlobalInactivityTime
  )
  const [shouldKeep, setShouldKeep] = React.useState(false)

  function handleSubmit() {
    onAdd(Number(waitingTime), shouldKeep)
  }

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

            <p style={{ color: '#607b99', fontSize: '.875rem', marginTop: 8 }}>
              Todos os blocos que esperam por uma entrada do usuário terão seu
              limite de espera setados para o valor abaixo.
              <br />
              <b>Você ainda precisa publicar o fluxo</b>
            </p>

            <div className="mt3">
              <Input
                value={waitingTime}
                onChange={(e) => setWaitingTime((e.target as any).value)}
                onSubmit={handleSubmit}
                label="Limite de espera (em minutos)"
                type="number"
              />

              <div className="flex mt3 pa2">
                <Switch
                  isChecked={shouldKeep}
                  name="overwrite"
                  onChange={(e) => setShouldKeep(e.target.checked)}
                />

                <div className="ml2">
                  <BdsTypo bold="extra-bold" variant="fs-14">
                    Manter limite de espera se já estiver definido
                  </BdsTypo>
                </div>
              </div>

              <div className="flex justify-between items-center mt5">
                <BdsButton
                  type="submit"
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Definir
                </BdsButton>

                <BdsButton variant="delete" onClick={onRemove}>
                  Remover*
                </BdsButton>
              </div>

              <p
                style={{
                  color: '#607b99',
                  fontSize: '.875rem',
                  marginTop: 8,
                }}
              >
                * Remove o limite de espera de <b>TODOS</b> os inputs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
