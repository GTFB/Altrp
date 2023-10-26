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

import Server from '@ioc:Adonis/Core/Server'
import Route from "@ioc:Adonis/Core/Route"
import './view'
import "../app/Services/TelegramBot"
import "../app/Services/DiscordBot"
import __ from "../helpers/__";

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
global.__ = __;
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('App/Middleware/ConvertEmptyString'),
  () => import('App/Middleware/SilentAuth'),
  () => import('@ioc:Adonis/Addons/Shield'),
])


Route.get('*', 'AltrpRouting.index')


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
  auth: () => import("App/Middleware/Auth"),
  admin: () => import("App/Middleware/IsAdmin"),
  cors: () => import("App/Middleware/Cors"),
  catch_unhandled_json: () => import("App/Middleware/CatchUnhandledJson"),
  strip_tags: () => import("App/Middleware/StripTags"),
})


