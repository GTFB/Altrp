import { SHOW_WIDGETS, HIDE_WIDGETS, SWITCH_SETTINGS_TAB, APP_SET_TITLE } from "../types";

export function toggleWidgets(value) {
  return value ? { type: SHOW_WIDGETS } : { type: HIDE_WIDGETS };
}

export function switchSettingsTab(value) {
  return { type: SWITCH_SETTINGS_TAB, payload: value };
}

export function setTitle(value) {
  return { type: APP_SET_TITLE, payload: value };
}
