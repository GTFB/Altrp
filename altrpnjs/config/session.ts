/**
 * Config source: https://git.io/JeYHp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { SessionConfig } from '@ioc:Adonis/Addons/Session'

const sessionConfig: SessionConfig = {
  enabled: true,
  driver: Env.get('SESSION_DRIVER', 'cookie'),
  cookieName: 'adonis-session',
  clearWithBrowser: false,
  age: Env.get('SESSION_LIFETIME','2h'),
  cookie: {
      domain: '',
      path: '/',
      maxAge: '2h',
      httpOnly: true,
      secure: false,
      sameSite: false,
    }, // see the cookie driver
  file: {
    location: Application.tmpPath('sessions'),
  }, // see the file driver
}

export default sessionConfig
