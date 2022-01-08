import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import appInstallFilesExist from "../../../helpers/appInstallFilesExist";
import base_path from "../../../helpers/base_path";
import fs from "fs";
import Env from '@ioc:Adonis/Core/Env'
import getLatestVersion from "../../../helpers/getLatestVersion";
import { string, base64 } from '@ioc:Adonis/Core/Helpers'
import {RequestContract} from "@ioc:Adonis/Core/Request";
import {Migrator} from "@adonisjs/lucid/build/src/Migrator";
import Database from "@ioc:Adonis/Lucid/Database";
import Application from "@ioc:Adonis/Core/Application";
import data_set from "../../../helpers/data_set";
import storage_path from "../../../helpers/storage_path";

export default class InstallationController {
  altrpInstall({ response, view}: HttpContextContract){

    if(this.altrpInstalled()){
      return response.redirect('/')
    }
    return view.render('installation')
  }

  async altrpInstallPost({request, response, }: HttpContextContract){
    const res = {
      data: {
        migratedFiles: undefined
      },
      success:  true,
    }
    try {


      this.generateDotEnv(request);

      const migrator = new Migrator(Database, Application, {
        direction: 'up',
        dryRun: true,
      })

      await migrator.run()
      data_set(res, 'data.migratedFiles', migrator.migratedFiles)
      response.type('json')
      fs.writeFileSync(storage_path('installed'), '')
    }
    catch(e){
      if(fs.existsSync(storage_path('installed'))){
        fs.unlinkSync(storage_path('installed'));
      }
      data_set(res, 'success', false)
      data_set(res, 'message', e.message)
      data_set(res, 'trace', e.trace)
      response.status(520)
    }
    return response.json(res);
  }
  /**
   * Проверка установки
   */
  altrpInstalled():boolean{
    return appInstallFilesExist();
  }

  generateDotEnv(request: RequestContract){
    let key
    if(fs.existsSync(base_path('.env'))){
      Env.set('APP_NAME', request.input('site_name', ''))
      Env.set('DB_USERNAME', request.input('database_username', ''))
      Env.set('DB_PASSWORD', request.input('database_password', ''))
      Env.set('DB_DATABASE', request.input('database_name', ''))
      Env.set('SESSION_DRIVER', 'file')
      key = Env.get('APP_KEY')
      key = key.replace('base64:', '')
    } else {
      key = string.generateRandom(32);
      key = base64.encode(key);
    }
    let fileContent = `APP_NAME=${request.input('site_name', '')}
APP_ENV=production
PATH_ENV=production
APP_KEY=${key}
APP_DEBUG=true
APP_URL=${request.protocol()}://${request.hostname()}
HOST=${request.hostname()}
PORT=3333
APP_VERSION=${getLatestVersion()}

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=${request.input('database_username', '')}
DB_PASSWORD=${request.input('database_password', '')}
DB_DATABASE=${request.input('database_name', '')}

CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=4800
`
    fs.writeFileSync(base_path('.env'), fileContent);
  }
}
