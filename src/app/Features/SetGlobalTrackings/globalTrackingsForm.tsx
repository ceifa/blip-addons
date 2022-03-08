import { BdsButton, BdsTypo } from 'blip-ds/dist/blip-ds-react'
import * as React from 'react'
import { v4 } from 'uuid'
import { SetGlobalTrackings } from '.'
import { Settings } from '../../Settings'
import { Input } from '../AddSidebar/Components/Input'
import { Switch } from '../AddSidebar/Components/Switch'

export const GlobalTrackingsForm = () => {
  const [globalExtras, setGlobalExtras] = React.useState(
    Settings.lastGlobalTrackings
  )
  const [error, setError] = React.useState([])
  const [shouldDeleteCurrentExtras, setShouldDeleteCurrentExtras] =
    React.useState(true)

  function getGlobalTrackingLine(): any {
    return (
      <div>
        {globalExtras.map((field, index) => {
          return (
            <div className="w-100 flex justify-between mb2" key={v4()}>
              <Input
                value={field.key}
                onChange={(e) => (field.key = e.target.value)}
                onSubmit={handleSubmit}
                errorMessage={error[index]}
                label="Key"
                type="text"
              />
              <div className="ml2">
                <Input
                  value={field.value}
                  onChange={(e) => (field.value = e.target.value)}
                  onSubmit={handleSubmit}
                  errorMessage={error[index]}
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

  function addNewLine(): void {
    setGlobalExtras([...globalExtras, { key: '', value: '' }])
  }

  function removeLine(index: number): void {
    setGlobalExtras(globalExtras.filter((_, i) => i !== index))
  }

  function getEmptyExtras(globalExtras): any[] {
    return globalExtras.filter(
      (currentExtra) => currentExtra.key === '' || currentExtra.value === ''
    )
  }

  function hasKeyOrValueEmpty(globalExtras: any): boolean {
    const emptyExtras = getEmptyExtras(globalExtras)
    const hasKeyOrValueEmpty = emptyExtras.length > 0

    return hasKeyOrValueEmpty
  }

  function listToObject(previousExtra: any, currentExtra: any): any {
    return { ...previousExtra, [currentExtra.key]: currentExtra.value }
  }

  function setErrorFields(globalExtras: any): string[] {
    const errorMessage = 'Preencha todos os campos'
    const emptyExtrasIndexs = globalExtras.map((extra, index) => {
      if (extra.key === '' || extra.value === '') {
        return index
      }
    })
    let arrayOfErrors = new Array(globalExtras.length)

    emptyExtrasIndexs.forEach((extraIndex) => {
      arrayOfErrors[extraIndex] = errorMessage
    })

    return arrayOfErrors
  }

  function handleSubmit(): void {
    if (hasKeyOrValueEmpty(globalExtras)) {
      let arrayOfErrors = setErrorFields(globalExtras)
      setError(arrayOfErrors)
      return
    }

    const globalSettingsWillBeSetted = globalExtras.reduce(
      (previousExtra, currentExtra) =>
        listToObject(previousExtra, currentExtra),
      {}
    )

    new SetGlobalTrackings().handle(
      globalSettingsWillBeSetted,
      shouldDeleteCurrentExtras
    )

    setError(new Array(globalExtras.length))
  }

  function onRemove(): void {
    new SetGlobalTrackings().handle({}, true)
  }

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
              Apagar trackings globais definidas
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
