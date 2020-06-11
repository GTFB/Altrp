export const SET_DISABLED = 'SET_DISABLED';
export const SET_ENABLE = 'SET_ENABLE';

export function setAdminDisable(){
  return {
    type: SET_DISABLED,
  }
}

export function setAdminEnable(){
  return {
    type: SET_ENABLE,
  }
}
