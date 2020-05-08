export const SET_MODAL_SETTINGS = 'SET_MODAL_SETTINGS';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export function setModalSettings(settings){
  return {
    ...settings,
    type: SET_MODAL_SETTINGS,
  }
}

export function toggleModal(){
  return {
    type: TOGGLE_MODAL,
  }
}
