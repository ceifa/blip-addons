export function getController() {
  const canvas = document.querySelector('#canvas')

  return window.angular.element(canvas).controller()
}

export function getFlow() {
  return getController().flow
}
