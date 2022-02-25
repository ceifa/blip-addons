import { BlipsExtension } from './BlipsExtension'
import { GetVariable } from './Commands'

const extension = new BlipsExtension().start()

extension.onBuilderReady(async () => {
  console.log('Pronto')

  const flow = await GetVariable.execute('flow')

  console.log(flow)
})
