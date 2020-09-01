import { SHOW_WIDGETS, HIDE_WIDGETS, SWITCH_SETTINGS_TAB } from "../types";

export function toggleWidgets(value) {
  return value ? { type: SHOW_WIDGETS } : { type: HIDE_WIDGETS };
}

export function switchSettingsTab(value) {
  return { type: SWITCH_SETTINGS_TAB, payload: value };
}
