/**
 * Config source: https://git.io/JeYHp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { SessionConfig } from '@ioc:Adonis/Addons/Session'
let secure = Env.get('COOKIE_SECURE',true)
let sameSite:boolean|'lax' | 'none' | 'strict' = 'none'
if(typeof secure === 'string'){
  secure = secure === 'true'
  if(! secure){
    sameSite = false
  }
}

const sessionConfig: SessionConfig = {
  enabled: true,
  driver: Env.get('SESSION_DRIVER', 'cookie'),
  cookieName: 'adonis-session',
  clearWithBrowser: false,
  age: parseInt(Env.get('SESSION_LIFETIME',7200)),
  cookie: {
      domain: '',
      path: '/',
    //@ts-ignore
      maxAge: 7200,
      httpOnly: true,
      secure,
      sameSite,
    }, // see the cookie driver
  file: {
    location: Application.tmpPath('sessions'),
  }, // see the file driver
}

export default sessionConfig
