import {
  LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_WIDGETS,
  HIDE_WIDGETS,
  SWITCH_SETTINGS_TAB,
  APP_SET_TITLE,
} from "../types";

import { ItemTypes } from "../../helpers/itemTypes";

const url = new URL(window.location.href);

const initialState = {
  showWidgets: false,
  loading: false,
  alert: null,
  settingsTab: ItemTypes.GLOBAL,
  templateId: url.searchParams.get("id"),
  title: "",
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER:
      return { ...state, loading: !state.loading };
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDE_ALERT:
      return { ...state, alert: null };
    case SHOW_WIDGETS:
      return { ...state, showWidgets: true };
    case HIDE_WIDGETS:
      return { ...state, showWidgets: false };
    case SWITCH_SETTINGS_TAB:
      return { ...state, settingsTab: action.payload };
    case APP_SET_TITLE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};
