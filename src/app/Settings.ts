import { SettingsUpdate } from './types'

export const Settings = {
    lastGlobalInactivityTime: '5',
    lastGlobalTrackings: []
}

export function setSettings(newSettings: Partial<typeof Settings>) {
    Object.assign(Settings, newSettings)

    const settingsUpdate: SettingsUpdate = {
        isSettingsUpdate: true,
        newSettings,
        isFromClient: true,
    }

    window.postMessage(settingsUpdate, '*')
}
