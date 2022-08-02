/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server';
import Route from '@ioc:Adonis/Core/Route';
import './view';
import './events';
import '../app/Services/TelegramBot';
import '../app/Services/DiscordBot';
//import "../app/Services/Timers";
import Env from '@ioc:Adonis/Core/Env';
import fs from 'fs';
import base_path from '../helpers/path/base_path';
import guid from '../helpers/guid';
import applyPluginsFiltersAsync from '../helpers/plugins/applyPluginsFiltersAsync';

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('App/Middleware/ConvertEmptyString'),
  () => import('App/Middleware/SilentAuth'),
  () => import('@ioc:Adonis/Addons/Shield'),
]);

applyPluginsFiltersAsync('on_start', '');

Route.get('*', 'AltrpRouting.index');

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  admin: () => import('App/Middleware/IsAdmin'),
  cors: () => import('App/Middleware/Cors'),
  catch_unhandled_json: () => import('App/Middleware/CatchUnhandledJson'),
});

/**
 * set package key
 */
let packageKey;
if (fs.existsSync(base_path('.package_key'))) {
  packageKey = fs.readFileSync(base_path('.package_key'), { encoding: 'utf8' });
  console.log('Setting package key by File');
} else {
  packageKey = guid();
  console.log('Setting package key by random guid');
}
Env.set('PACKAGE_KEY', packageKey);
