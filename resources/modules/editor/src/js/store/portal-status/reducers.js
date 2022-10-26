import { SET_PREVIEW_SETTING_MODAL_OPENED, SET_PREVIEW_TAB } from './actions';

const INITIAL_STATE = {
  isPreviewSettingModalOpened: false,
  previewTab: null,
};

export function portalStatusReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PREVIEW_SETTING_MODAL_OPENED:
      return {
        ...state,
        isPreviewSettingModalOpened: action.payload,
      };

    case SET_PREVIEW_TAB:
      return {
        ...state,
        previewTab: action.payload,
      };
  }

  return state;
}
