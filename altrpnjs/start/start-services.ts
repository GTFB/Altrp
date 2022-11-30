/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Customizer from 'App/Models/Customizer'
import isProd from "../helpers/isProd";
import env from "../helpers/env";
import Application from "@ioc:Adonis/Core/Application";
import Plugin from "App/Plugin";
import fs from "fs";
import base_path from "../helpers/path/base_path";
import guid from "../helpers/guid";
import Env from "@ioc:Adonis/Core/Env";
import startChildWithSockets from "../helpers/startChildWithSockets";

if(! isProd() || env('CLUSTER') != 'true'  || (
  env('PM2_ID') && env('PM2_ID') ==  process.env.pm_id || ! env('PM2_ID') && process.env.INSTANCE_ID == '0'
)){

  if(Application.environment === 'web') {
    startChildWithSockets()
    console.log('booking schedules...')
    Customizer.scheduleAll()
    const plugins = Plugin.getEnabledPlugins()
    plugins.forEach(plugin => plugin.callActivationHooks())

    /**
     * set package key
     */
    let packageKey
    if(fs.existsSync(base_path('.package_key'))){
      packageKey = fs.readFileSync(base_path('.package_key'), {encoding:'utf8'})
    } else {
      packageKey = guid()
    }
    Env.set('PACKAGE_KEY', packageKey)
  }

}
