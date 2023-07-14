import AdmZip from "adm-zip"
import env from '../../helpers/env';
import axios from 'axios';
import base_path from '../../helpers/path/base_path';
import fs from 'fs'
import { exec } from'child_process'
import {promisify} from 'util'
import public_path from "../../helpers/path/public_path";
import clearRequireCache from "../../helpers/node-js/clearRequireCache";
import View from "@ioc:Adonis/Core/View";
import {CacheManager} from "edge.js/build/src/CacheManager";
import guid from "../../helpers/guid";
import Env from "@ioc:Adonis/Core/Env";
import applyPluginsFiltersAsync from "../../helpers/plugins/applyPluginsFiltersAsync";

export default class UpdateService {

  private static UPDATE_DOMAIN = 'https://cdn.altrp.com/api/v1/download_altrp_94nvxm3m7'
  private static RESERVE_UPDATE_DOMAIN = 'https://up.altrp.com/downloads/altrp-js/'

  private static ARCHIVE_PATH = base_path('temp.zip')

  /**
   * @return string
   * @throws HttpException
   */
  public async update(version = 'latest') {
    if (env('APP_ENV', 'development') !== 'production') {
      return true;
    }

    console.log("Starting Update")
    let file = ''
    try {
      file = (await axios.get(UpdateService.UPDATE_DOMAIN, {
        responseType: 'arraybuffer',
        headers: {
          'x-altrp-domain': env('APP_URL'),
        },
        params: {
          version
        }
      }))?.data || '';
    } catch (e) {
      try {
        file = (await axios.get(UpdateService.RESERVE_UPDATE_DOMAIN + version, {
          responseType: 'arraybuffer',
          headers: {
            'x-altrp-domain': env('APP_URL'),
          },
        }))?.data || '';

      }catch (e) {
        console.error(e)
        return false
      }
      console.error(e)
    }
    if (!await UpdateService.write_public_permissions()) {
      console.error('Failed to update file read mode');
    }

    if (!file) {
      throw new Error('Archive is empty');
    }
    UpdateService.save_archive(file)


    UpdateService.update_files()
    await   applyPluginsFiltersAsync('altrp_files_updated', '')

    if (!await UpdateService.write_public_permissions('public')) {
      console.error('Failed to update file reading mode after unzipping');
    }
    UpdateService.delete_archive()
    // Upgrade the Database
    await UpdateService.upgradePackages()
    await UpdateService.upgradeDatabase()
    /**
     * clear all view cached pages
     */
    View.asyncCompiler.cacheManager = new CacheManager(env('CACHE_VIEWS'))
    clearRequireCache()
    UpdateService.setPackageKey();
    console.log("End Update")
    return true;
  }
  static setPackageKey(){

    /**
     * set package key
     */
    let packageKey
    if(fs.existsSync(base_path('.package_key'))){
      packageKey = fs.readFileSync(base_path('.package_key'), {encoding:'utf8'})
      console.log("Setting package key by File")
    } else {
      packageKey = guid()
      console.log("Setting package key by random guid")
    }
    Env.set('PACKAGE_KEY', packageKey)
  }
  /**
   * @param {string} file_content
   * @return bool
   */
  private static save_archive(file_content: string) {
    fs.writeFileSync(UpdateService.ARCHIVE_PATH, file_content);
  }

  private static update_files() {
    let archive = new AdmZip(UpdateService.ARCHIVE_PATH)
    if(!archive.test()){
      throw new Error('Archive no pass a test')
    }
    if (fs.existsSync(public_path('modules'))) {
      fs.rmSync(public_path('modules'), {recursive: true});
      fs.rmSync(base_path('database', ), {recursive: true});
    }
    archive.extractAllTo(base_path(), true);
  }

  private static async write_public_permissions(path = '') {
    try {
      await promisify(exec)('chmod -R 0775  ' + base_path(path))
      return true;
    } catch (e) {
      return false;
    }
  }

  private static delete_archive() {
    fs.rmSync(UpdateService.ARCHIVE_PATH);
  }


  /**
   * Upgrade the Database & Apply actions
   *
   */
  private static async upgradeDatabase() {
    await promisify(exec)(`node ${base_path('ace')} migration:run --force`)
    return true;
  }

  /**
   * Upgrade the Database & Apply actions
   *
   */
  private static async upgradePackages() {
    try{
      console.log(await promisify(exec)(`npm --prefix ${base_path()} ci --production` ))

    } catch (e) {
      console.error(e)
      console.log(await promisify(exec)(`npm --prefix ${base_path()} ci --production` ))
    }

    return true;
  }
}
