/**
 *
 * @param {string} settingName
 * @param {string} defaultSettingName
 * @return {boolean}
 */
import CONSTANTS from "../consts";

const screensNames = []
const states = []


for (let s of CONSTANTS.SCREENS) {
  screensNames.push(s.name)
}
for (let s of CONSTANTS.BUTTONS) {
  if (s.value) {
    states.push(s.value)
  }
}
export default function isSettingNameVariant(settingName, defaultSettingName) {
  if (!settingName.includes(defaultSettingName)) {
    return false
  }
  settingName = settingName.replace(defaultSettingName, '')
  if (!settingName) {
    return true
  }
  for (const screen of screensNames) {
    if (!settingName.includes(screen)) {
      continue
    }
    settingName = settingName.replace(screen, '')
    if (/^_*$/.test(settingName)) {
      return true
    }
  }

  for (const state of states) {
    if (!settingName.includes(state)) {
      continue
    }
    settingName = settingName.replace(state, '')
    return /^_*$/.test(settingName)
  }
  return false

}
