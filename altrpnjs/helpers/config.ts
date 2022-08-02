/**
 * Get / set the specified configuration value.
 *
 * If an array is passed as the key, we will assume you want to set an array of values.
 *
 * @param  {array|string|null}  key
 * @param  {*}  $default
 * @return mixed|\Illuminate\Config\Repository
 */
import is_null from './is_null';
import Config from '@ioc:Adonis/Core/Config';
import is_object from './is_object';

/**
 *
 * @param {*} key
 * @param $default
 */
export default function config(key?: any, $default?: any) {
  if (is_null(key)) {
    return Config.all();
  }

  if (is_object(key)) {
    for (let k in key) {
      if (key.hasOwnProperty(k)) {
        Config.set(k, key[k]);
      }
    }
    return true;
  }

  return Config.get(key, $default);
}
