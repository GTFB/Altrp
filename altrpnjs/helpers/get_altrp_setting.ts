import Env from "@ioc:Adonis/Core/Env";
import decrypt from "./decrypt";

export function get_setting_key(setting_name: string) {

  return 'ALTRP_SETTING_' + setting_name.toUpperCase();

}

export default function get_altrp_setting(setting_name = '', _default = '', _decrypt = false) {

  let value = _default;
  if (!setting_name) {
    return value;
  }
  let settings_key = get_setting_key(setting_name);
  value = Env.get(settings_key, _default);
  if (_decrypt) {
    try {
      value = decrypt(value) || '';
    } catch (e) {
      console.error(e);
      value = '';
    }
  }
  return value ? value : _default;
}
