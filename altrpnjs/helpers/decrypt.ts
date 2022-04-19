import {

  createDecipheriv,

} from 'crypto';
import unserialize from "./unserialize";
import {base64} from "@ioc:Adonis/Core/Helpers";
import getAppEncryptKey from "./getAppEncryptKey";



export default function decrypt(value: string, _unserialize = true): string {
  let dec_data = '';
  try{

    let _value = JSON.parse(base64.decode(value))
    let iv = Buffer.from(_value.iv,  'base64')
    let key = getAppEncryptKey()
    let dec = createDecipheriv('aes-256-cbc', key, iv);
    dec_data =dec.update(_value.value, 'base64','utf8');
    dec_data += dec.final('utf8');
    if(_unserialize){
      dec_data = unserialize(dec_data)
    }
  }catch (e) {
    console.error(e);

  }
  return dec_data
}
