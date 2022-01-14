import Env from "@ioc:Adonis/Core/Env";
import Encryption from '@ioc:Adonis/Core/Encryption'

export function get_setting_key(setting_name: string) {

  return 'ALTRP_SETTING_' + setting_name.toUpperCase() ;

}

export default function get_altrp_setting( setting_name = '', $default = '', decrypt = false){

  let value = $default;
  if( ! setting_name ){
    return value;
  }
  let settings_key = get_setting_key( setting_name );

    value = Env.get(settings_key, $default);

  if( decrypt ){
    try {
      value = Encryption.decrypt( value ) || '';
    } catch( e){
      value = '';
    }
  }
  return value ? value : $default;
}
