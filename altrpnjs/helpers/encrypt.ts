import { createCipheriv, randomBytes } from 'crypto';
import serialize from './serialize';
import { base64 } from '@ioc:Adonis/Core/Helpers';
import getAppEncryptKey from './getAppEncryptKey';

export default function encrypt(value: string, _serialize = true): string {
  let dec_data = '';
  let iv = randomBytes(16);
  try {
    // @ts-ignore
    value = _serialize ? serialize(value) : value;
    let key = getAppEncryptKey();
    let cipher = createCipheriv('aes-256-cbc', key, iv);
    dec_data = cipher.update(value, 'utf8', 'base64');
    dec_data += cipher.final('base64');
  } catch (e) {
    console.error(e);
  }
  let result: any = {
    value: dec_data,
    iv: base64.encode(iv),
  };
  result = JSON.stringify(result);
  result = base64.encode(result);

  return result;
}
