import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import base_path from '../../../../helpers/path/base_path';
import fs from 'fs';
import env from '../../../../helpers/env';
import envWriter from '../../../../helpers/envWriter';

export default class MailController {
  static keys = [
    'MAIL_DRIVER',
    'MAIL_HOST',
    'MAIL_PORT',
    'MAIL_USERNAME',
    'MAIL_PASSWORD',
    'MAIL_ENCRYPTION',
    'MAIL_FROM_ADDRESS',
    'MAIL_FROM_NAME',
    'MAIL_TO_NEW_USERS',
  ];

  async getSettings({ response }: HttpContextContract) {
    let settings = {};

    for (let key of MailController.keys) {
      if (env(key)) {
        settings[key.toLowerCase()] = env(key);
      } else {
        settings[key.toLowerCase()] = '';
      }
    }
    return response.json({ success: true, data: settings });
  }

  async writeSettingsToEnv({ request, response }: HttpContextContract) {
    let data = request.all();
    let file = base_path('.env');
    if (!fs.existsSync(file)) {
      response.status(400);
      return response.json({
        success: false,
        message: 'File .env not found!',
      });
    }
    const _data: { key: string; value: string }[] = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        _data[key.toUpperCase()] = data[key];
        _data.push({
          key: key.toUpperCase(),
          value: data[key],
        });
      }
    }
    try {
      // await updateDotenv(_data)
      envWriter(_data);
    } catch (e) {
      response.status(500);
      return response.json({ success: false, message: 'Failed to write mail setting' });
    }
    return response.json({ success: true, message: 'Mail settings configure successfully.' });
  }
}
