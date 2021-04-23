export const SET_DISABLED = 'SET_DISABLED';
export const SET_ENABLE = 'SET_ENABLE';
export const SET_PROPERTY = 'SET_PROPERTY';

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