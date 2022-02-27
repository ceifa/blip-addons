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

export function showSuccessToast(message: string) {
  getController().ngToast.success(message)
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
