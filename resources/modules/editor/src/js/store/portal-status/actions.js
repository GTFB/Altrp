export const SET_PREVIEW_SETTING_MODAL_OPENED = 'SET_PREVIEW_SETTING_MODAL_OPENED';

export function setPreviewSettingModalOpened(isOpened = true) {
  return {
    type: SET_PREVIEW_SETTING_MODAL_OPENED,
    payload: isOpened,
  };
}
