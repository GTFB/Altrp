import AdmZip from "adm-zip"
import env from '../../helpers/env';
import Logger from '@ioc:Adonis/Core/Logger';
import axios from 'axios';
import base_path from '../../helpers/base_path';
import fs from 'fs'
import { exec } from'child_process'
import {promisify} from 'util'
import public_path from "../../helpers/public_path";
import get_altrp_setting from "../../helpers/get_altrp_setting";

export default class UpdateService {

  private static UPDATE_DOMAIN = 'https://up.altrp.com/downloads/altrp-js/latest'

  private static ARCHIVE_PATH = base_path('temp.zip')

  /**
   * @return string
   * @throws HttpException
   */
  public async update() {
    if (env('APP_ENV', 'development') !== 'production') {
      return true;
    }

    let file = ''
    try {
      file = (await axios.get(UpdateService.UPDATE_DOMAIN))?.data || '';
    } catch (e) {
      return false;
    }
    if (!await UpdateService.write_public_permissions()) {
      Logger.error('Failed to update file read mode');
    }

    if (!file) {
      throw new Error('Archive is empty');
    }
    UpdateService.save_archive(file)


    UpdateService.update_files()

    if (!await UpdateService.write_public_permissions('public')) {
      Logger.error('Failed to update file reading mode after unzipping');
    }
    UpdateService.delete_archive()
    // Upgrade the Database
    let updateCommand = get_altrp_setting('update_command', '', true).trim()
    if(! updateCommand){
      updateCommand = 'pm2 restart all'
    }
    await UpdateService.upgradeDatabase();
    await promisify(exec)(updateCommand)
    // Write providers
    // Update modules statuses
    // Update the current version to last version
    return true;
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
      throw 'Archive no pass a test'
    }
    if (fs.existsSync(public_path('modules'))) {
      fs.rmdirSync(public_path('modules'), {recursive: true});
      fs.rmdirSync(base_path('database', ), {recursive: true});
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
}
