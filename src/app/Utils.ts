import type { FeatureRequest } from './types'

export function getController() {
  const canvas = document.querySelector('#canvas')

  return window.angular.element(canvas).controller()
}

export function getFlow() {
  return getController().flow
}

export function getBlocks(): any[] {
  return Object.values(getFlow())
}

export function getBlockById(id: string) {
  return getFlow()[id]
}

export function showSuccessToast(message: string) {
  getController().ngToast.success(message)
}

export function showWarningToast(message: string) {
  getController().ngToast.warning(message)
}

export function showDangerToast(message: string) {
  getController().ngToast.danger(message)
}

export function cleanCopiedStates() {
  getController().copiedStates = []
}

export function selectBlock(id: string) {
  const watchNode = setInterval(() => {
    const node = document.querySelector(`builder-node[id="${id}"]`)

    if (node) {
      getController().selectNode(node)
      clearInterval(watchNode)
    }
  })
}

export function cleanSelectedNodes() {
  getController().selectedNodes = []
}

export function interceptFunction(functionName: string, callback: () => void) {
  const controller = getController()
  const functionToWrap = controller[functionName]

  controller[functionName] = function keepThis(...args: any[]) {
    callback()
    return functionToWrap.apply(this, args)
  }
}

export function convertToHours(waitingTime: number) {
  const waitingHours = Math.floor(waitingTime / 60)
  const waitingMinutes = waitingTime % 60

  return `${waitingHours}:${waitingMinutes}`
}

export function requestFeature(code: string, type: 'cleanup' | 'run', ...args) {
  const message: FeatureRequest = {
    isFeatureRequest: true,
    type,
    code,
    args,
  }

  window.postMessage(message, '*')
}

export function getBotName() {
  return getController().application.shortName
}

export function createNearbyPosition() {
  return getController().createNearbyPosition()
}
