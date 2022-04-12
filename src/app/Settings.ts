import { SettingsUpdate } from './types';

export const Settings = {
  lastGlobalInactivityTime: '5',
  lastGlobalTrackings: [],
  lastRemovedGlobalTrackings: [],
  isCleanEnviroment: false,
  prodKey: 'prd,prod',
  hmgKey: 'hmg',
  betaKey: 'beta',
  devKey: 'dev',
};

export const mergeSettings = (newSettings: Partial<typeof Settings>): void => {
  Object.assign(Settings, newSettings);
};

export const setSettings = (newSettings: Partial<typeof Settings>): void => {
  mergeSettings(newSettings);

  const settingsUpdate: SettingsUpdate = {
    isSettingsUpdate: true,
    newSettings,
    isFromClient: true,
  };

  window.postMessage(settingsUpdate, '*');
};
