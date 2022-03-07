import { BdsButton, BdsTypo } from 'blip-ds/dist/blip-ds-react'
import * as React from 'react'
import { v4 } from 'uuid'
import { Settings } from '../../Settings'
import { Input } from '../AddSidebar/Components/Input'
import { Switch } from '../AddSidebar/Components/Switch'

export const GlobalTrackingsForm = (
) => {
  const [globalExtras, setGlobalExtras] = React.useState(
    Settings.lastGlobalTrackings
  )
  const [error, setError] = React.useState('')
  const [shouldDeleteCurrentExtras, setShouldDeleteCurrentExtras] =
    React.useState(true)
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
    setGlobalExtras([...globalExtras, { key: '', value: '' }])
  }

  function removeLine(index) {
    setGlobalExtras(globalExtras.filter((_, i) => i !== index))
  }

  function handleSubmit(e) {
    let waitingTime = 'alterar'
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
    // onAdd(time, shouldDeleteCurrentExtras)
  }

  function onRemove() {}

  return (
    <div className="sidebar-inner-content pa5">
      <span className="bp-fs-5 bp-c-city ttu b">
        Adicionar trackings globais
      </span>

      <p style={{ color: '#607b99', fontSize: '.875rem', marginTop: 8 }}>
        Todos os blocos que contem a ação de tracking terá adição de trackings
        globais.
        <br />
        <b>Você ainda precisa publicar o fluxo</b>
      </p>

      <div className="mt3">
        {getGlobalTrackingLine()}

        <div className="flex mt3 pa2">
          <Switch
            isChecked={shouldDeleteCurrentExtras}
            name="overwrite"
            onChange={(e) => setShouldDeleteCurrentExtras(e.target.checked)}
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

          <BdsButton type="submit" variant="primary" onClick={handleSubmit}>
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
  )
}
