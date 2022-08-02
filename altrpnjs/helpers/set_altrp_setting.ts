import Env from '@ioc:Adonis/Core/Env';
import { get_setting_key } from './get_altrp_setting';
import envWriter from './envWriter';
import encrypt from './encrypt';

export default async function set_altrp_setting(setting_name = '', value = '', _encrypt = false) {
  if (!setting_name) {
    return value;
  }
  let setting_key = get_setting_key(setting_name);

  if (_encrypt) {
    try {
      value = encrypt(value) || '';
    } catch (e) {
      value = '';
    }
  }
  await envWriter([
    {
      key: setting_key,
      value: value,
    },
  ]);
  Env.set(setting_key, value);
  return;
}
