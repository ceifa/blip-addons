import { SettingsUpdate } from './types';

export const Settings = {
  lastGlobalInactivityTime: '5',
  lastGlobalTrackings: [],
  lastRemovedGlobalTrackings: [],
  isCleanEnviroment: false,
  prodKey: ['prd', 'prod'],
  hmgKey: ['hmg'],
  betaKey: ['beta'],
  devKey: ['dev'],
  personalSnippets: [],
};

export const mergeSettings = (newSettings: Partial<typeof Settings>): void => {
  Object.assign(Settings, newSettings);
};

export const setSettings = (newSettings: Partial<typeof Settings>): void => {
  mergeSettings(newSettings);

  const isFromServer = Boolean(chrome && chrome.storage);

  const settingsUpdate: SettingsUpdate = {
    isSettingsUpdate: true,
    newSettings: Settings,
    isFromClient: !isFromServer,
  };

  if (isFromServer) {
    chrome.storage.sync.set({ settings: Settings });
  }

  window.postMessage(settingsUpdate, '*');
};
