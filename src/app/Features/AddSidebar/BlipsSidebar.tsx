import * as React from 'react'

import { BdsButton, BdsTypo } from 'blip-ds/dist/blip-ds-react'
import { Input } from './Components/Input'
import { Settings } from '../../Settings'
import { Switch } from './Components/Switch'
import { v4 } from 'uuid'

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

  const [globalExtras, setGlobalExtras] = React.useState(
    Settings.lastGlobalTrackings
  )

  const [shouldDeleteCurrentExtras, setShouldDeleteCurrentExtras] =
    React.useState(true)

  const [shouldKeep, setShouldKeep] = React.useState(false)
  const [error, setError] = React.useState('')

  function getGlobalTrackingLine() {
    return (
        <div>
          {globalExtras.map((field, index) => {
            return (
              <div className="w-100 flex justify-between mb2" key={v4()}>
                <Input
                  value={field.key}
                  onChange={(e) => {
                    field.key = e.target.value
                    setGlobalExtras([...globalExtras])
                  }}
                  onSubmit={handleSubmit}
                  errorMessage={error}
                  label="Key"
                  type="text"
                />
                <div className="ml2">
                    <Input
                    value={field.value}
                    onChange={(e) => {
                        field.value = e.target.value
                        setGlobalExtras([...globalExtras])
                    }}
                    onSubmit={handleSubmit}
                    errorMessage={error}
                    label="Value"
                    type="text"
                    />
                </div>
                <i
                  className="self-center icon-close lh-solid cursor-pointer ml2"
                  onClick={() => removeLine(index)}
                ></i>
              </div>
            )
          })}
        </div>
    )
  }

  function addNewLine() {
    setGlobalExtras([...globalExtras, {key: '', value: ''}])
  }

  function removeLine(index) {
    setGlobalExtras(globalExtras.filter((_, i) => i !== index))
  }

  function handleSubmit(e) {
    if (!waitingTime) {
      setError('Preencha com um valor entre 1 e 1380')
      return
    }

    const time = Number(waitingTime)
    const isTimeValid = time > 0 && time < 1380

    if (!isTimeValid) {
      setError('Utilize números entre 1 e 1380')
      return
    }

    setError('')
    onAdd(time, shouldKeep)
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
                errorMessage={error}
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
          <div className="sidebar-inner-content pa5">
            <span className="bp-fs-5 bp-c-city ttu b">
              Adicionar trackings globais
            </span>

            <p style={{ color: '#607b99', fontSize: '.875rem', marginTop: 8 }}>
              Todos os blocos que contem a ação de tracking terá adição de
              trackings globais.
              <br />
              <b>Você ainda precisa publicar o fluxo</b>
            </p>

            <div className="mt3">
              {getGlobalTrackingLine()}

              <div className="flex mt3 pa2">
                <Switch
                  isChecked={shouldDeleteCurrentExtras}
                  name="overwrite"
                  onChange={(e) =>
                    setShouldDeleteCurrentExtras(e.target.checked)
                  }
                />

                <div className="ml2">
                  <BdsTypo bold="extra-bold" variant="fs-14">
                    Manter trackings globais definidas
                  </BdsTypo>
                </div>
              </div>

              <div className="flex justify-between items-center mt5">
                <BdsButton variant="dashed" onClick={addNewLine}>
                  Add Tracking
                </BdsButton>

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
                * Remove as trackings globais de <b>TODAS</b> as actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
