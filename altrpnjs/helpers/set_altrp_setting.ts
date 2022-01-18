import Env from "@ioc:Adonis/Core/Env";
import {get_setting_key} from "./get_altrp_setting";
import encrypt from "./encrypt";
import updateDotenv from "update-dotenv";

export default async function  set_altrp_setting( setting_name = '', value = '', _encrypt = false){

  if( ! setting_name ){
    return value;
  }
  let setting_key = get_setting_key( setting_name );


  if( _encrypt ){
    try {
      value = encrypt( value ) || '';
    } catch( e){
      value = '';
    }
  }
  await updateDotenv({[setting_key]: value})
  Env.set(setting_key, value)
  return
}
