export const SET_PREVIEW_SETTING_MODAL_OPENED = 'SET_PREVIEW_SETTING_MODAL_OPENED';
export const SET_PREVIEW_TAB = 'SET_PREVIEW_TAB';

export function setPreviewSettingModalOpened(isOpened = true) {
  return {
    type: SET_PREVIEW_SETTING_MODAL_OPENED,
    payload: isOpened,
  };
}

export function setPreviewTab(tab) {
  return {
    type: SET_PREVIEW_TAB,
    payload: tab,
  };
}
