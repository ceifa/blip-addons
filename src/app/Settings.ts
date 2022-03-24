import { SettingsUpdate } from './types';

export const Settings = {
  lastGlobalInactivityTime: '5',
  lastGlobalTrackings: [],
  lastRemovedGlobalTrackings: [],
  isCleanEnviroment: false,
};

export const setSettings = (newSettings: Partial<typeof Settings>): void => {
  Object.assign(Settings, newSettings);

  const settingsUpdate: SettingsUpdate = {
    isSettingsUpdate: true,
    newSettings,
    isFromClient: true,
  };

  window.postMessage(settingsUpdate, '*');
};
