/**
 *
 * @param {string} settingName
 * @param {*} defaultValue
 * @returns {string}
 */
export  default function getAltrpSetting(settingName, defaultValue){
  let value = process.env[getAltrpSettingKey(settingName)];
  if(value === undefined){
    value = defaultValue;
  }
  return value
}
/**
 *
 * @param {string} settingName
 * @returns {string}
 */
export function getAltrpSettingKey(settingName){
  return 'ALTRP_SETTING_' + settingName.toUpperCase();
}
