export const SET_DISABLED = 'SET_DISABLED';
export const SET_ENABLE = 'SET_ENABLE';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_DISABLED_RESET = 'SET_DISABLED_RESET';
export const SET_ENABLE_RESET = 'SET_ENABLE_RESET';

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

export function setAdminResetDisable(){
  return {
    type: SET_DISABLED_RESET,
  }
}

export function setAdminResetEnable(){
  return {
    type: SET_ENABLE_RESET,
  }
}

/**
 * Устанавлевает свойство админки
 * @param propertyName
 * @param value
 * @return {{type: string, propertyName: *, value: *}}
 */
export function setAdminProperty(propertyName, value){

  return {
    type: SET_PROPERTY,
    propertyName,
    value,
  }
}
