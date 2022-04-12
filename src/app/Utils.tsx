import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  ConfirmationAlert,
  ConfirmationAlertProps,
} from '@features/RemoveGlobalTrackings/ConfirmationAlert';
import { OVERLAY_ID } from './Constants';
import type { FeatureRequest } from './types';

const BUILDER_HTML_BLOCK_TAG = 'builder-node';

export const getController = (): any => {
  const canvas = document.querySelector('#canvas');

  return window.angular.element(canvas).controller();
};

export const getFlow = (): any => {
  return getController().flow;
};

export const getBlocks = (): any[] => {
  return Object.values(getFlow());
};

export const getBlockById = (id: string): any => {
  return getFlow()[id];
};

export const showSuccessToast = (message: string): void => {
  getController().ngToast.success(message);
};

export const showWarningToast = (message: string): void => {
  getController().ngToast.warning(message);
};

export const showDangerToast = (message: string): void => {
  getController().ngToast.danger(message);
};

export const cleanCopiedStates = (): void => {
  getController().copiedStates = [];
};

export const selectBlock = (id: string): void => {
  const watchNode = setInterval(() => {
    const node = document.querySelector(`builder-node[id="${id}"]`);

    if (node) {
      getController().selectNode(node);
      clearInterval(watchNode);
    }
  });
};

export const cleanSelectedNodes = (): void => {
  getController().selectedNodes = [];
};

export const interceptFunction = (
  functionName: string,
  callback: () => void
): void => {
  const controller = getController();
  const functionToWrap = controller[functionName];

  controller[functionName] = function keepThis(...args: any[]) {
    const result = functionToWrap.apply(this, args);

    setTimeout(() => callback());

    return result;
  };
};

export const convertToHours = (waitingTime: number): string => {
  const waitingHours = Math.floor(waitingTime / 60);
  const waitingMinutes = waitingTime % 60;

  return `${waitingHours}:${waitingMinutes}`;
};

export const requestFeature = (
  code: string,
  type: 'cleanup' | 'run',
  ...args
): void => {
  const message: FeatureRequest = {
    isFeatureRequest: true,
    type,
    code,
    args,
  };

  window.postMessage(message, '*');
};

export const getBotName = (): string | false => {
  const controller = getController();

  if (controller) {
    const botName = controller.application.name;
    return botName;
  }

  const botName = document.querySelector(
    '.bot-name:nth-child(1)'
  ) as HTMLElement;

  if (botName) {
    return botName.innerText;
  }

  return false;
};

export const createNearbyPosition = (): { left: string; top: string } => {
  return getController().createNearbyPosition();
};

export const getSpace = (): any => {
  return getController().g2p;
};

export const getHandleOnKeyDown = (): any => {
  return getController().handleOnKeyDown;
};

export const getFlowBlockById = (id: string): any => {
  return document.querySelector(`${BUILDER_HTML_BLOCK_TAG}[id="${id}"]`);
};

export const getAllFlowBlock = (): any => {
  return document.querySelectorAll(`${BUILDER_HTML_BLOCK_TAG}`);
};

export const rgbToHex = (r: any, g: any, b: any): any =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

export const hexToRgb = (hex): any => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getContrastColor = (color: any): string => {
  const brightness = 1;

  const r = color.r;
  const g = color.g;
  const b = color.b;

  const ir = Math.floor((255 - r) * brightness);
  const ig = Math.floor((255 - g) * brightness);
  const ib = Math.floor((255 - b) * brightness);

  return rgbToHex(ir, ig, ib);
};

export const createOverlay = (): HTMLElement => {
  let overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    return overlay;
  }

  overlay = document.createElement('div');

  overlay.id = OVERLAY_ID;
  overlay.style.position = 'absolute';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.top = '0';

  return overlay;
};

export const createConfirmationAlert = (
  props: ConfirmationAlertProps
): void => {
  const overlay = createOverlay();
  const alert = document.createElement('div');

  ReactDOM.render(<ConfirmationAlert {...props} />, alert);

  overlay.appendChild(alert);
  document.body.appendChild(overlay);
};

export const removeOverlay = (): void => {
  const overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    document.getElementById(OVERLAY_ID).remove();
  }
};
