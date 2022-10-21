import { SET_PREVIEW_SETTING_MODAL_OPENED } from './actions';

const INITIAL_STATE = {
  isPreviewSettingModalOpened: false,
};

export function portalStatusReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PREVIEW_SETTING_MODAL_OPENED:
      return {
        ...state,
        isPreviewSettingModalOpened: action.payload
      };
  }

  return state;
}
