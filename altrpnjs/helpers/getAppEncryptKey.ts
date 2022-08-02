import Env from '@ioc:Adonis/Core/Env';

export default function getAppEncryptKey(): Buffer {
  let key = Buffer.from(Env.get('APP_KEY').replace('base64:', ''), 'base64');
  key = key.slice(0, 32);
  return key;
}
