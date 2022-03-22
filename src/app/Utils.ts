import type { FeatureRequest } from './types';

const BUILDER_HTML_BLOCK_TAG = 'builder-node';

export const getController = () => {
  const canvas = document.querySelector('#canvas');

  return window.angular.element(canvas).controller();
};

export const getFlow = () => {
  return getController().flow;
};

export const getBlocks = (): any[] => {
  return Object.values(getFlow());
};

export const getBlockById = (id: string) => {
  return getFlow()[id];
};

export const showSuccessToast = (message: string) => {
  getController().ngToast.success(message);
};

export const showWarningToast = (message: string) => {
  getController().ngToast.warning(message);
};

export const showDangerToast = (message: string) => {
  getController().ngToast.danger(message);
};

export const cleanCopiedStates = () => {
  getController().copiedStates = [];
};

export const selectBlock = (id: string) => {
  const watchNode = setInterval(() => {
    const node = document.querySelector(`builder-node[id="${id}"]`);

    if (node) {
      getController().selectNode(node);
      clearInterval(watchNode);
    }
  });
};

export const cleanSelectedNodes = () => {
  getController().selectedNodes = [];
};

export const interceptFunction = (
  functionName: string,
  callback: () => void
) => {
  const controller = getController();
  const functionToWrap = controller[functionName];

  controller[functionName] = function keepThis(...args: any[]) {
    const result = functionToWrap.apply(this, args);
    callback();
    return result;
  };
};

export const convertToHours = (waitingTime: number) => {
  const waitingHours = Math.floor(waitingTime / 60);
  const waitingMinutes = waitingTime % 60;

  return `${waitingHours}:${waitingMinutes}`;
};

export const requestFeature = (
  code: string,
  type: 'cleanup' | 'run',
  ...args
) => {
  const message: FeatureRequest = {
    isFeatureRequest: true,
    type,
    code,
    args,
  };

  window.postMessage(message, '*');
};

export const getBotName = () => {
  return getController().application.name;
};

export const createNearbyPosition = () => {
  return getController().createNearbyPosition();
};

export const getSpace = () => {
  return getController().g2p;
};

export const getHandleOnKeyDown = () => {
  return getController().handleOnKeyDown;
};

export const getFlowBlockById = (id: string): any => {
  return document.querySelector(`${BUILDER_HTML_BLOCK_TAG}[id="${id}"]`);
};

export const getAllFlowBlock = (): any => {
  return document.querySelectorAll(`${BUILDER_HTML_BLOCK_TAG}`);
};
