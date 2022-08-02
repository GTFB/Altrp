import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FontSetting from 'App/Models/FontSetting';

export default class FontSettingSettingsController {
  public async store({ request, response }: HttpContextContract) {
    let fontSetting = new FontSetting();
    fontSetting.fill(request.all());

    try {
      await fontSetting.save();
    } catch (e) {
      return response.json({
        'success': false,
        'message': "Font Setting don't saved",
        'throw message': e.message,
        'trace': e.stack.split('\n'),
      });
    }
    return response.json({
      success: true,
      data: fontSetting,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    let fontSetting = await FontSetting.find(params.id);
    if (!fontSetting) {
      return response.json({
        success: false,
        message: 'Font Setting not found',
      });
    }
    return response.json({
      success: true,
      data: fontSetting,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    let fontSetting = await FontSetting.find(params.id);
    if (!fontSetting) {
      return response.json({
        success: false,
        message: 'Font Setting not found',
      });
    }
    fontSetting.merge(request.all());
    try {
      await fontSetting.save();
    } catch (e) {
      response.status(500);
      return response.json({
        'success': false,
        'message': 'Font Setting could not be saved',
        'throw message': e.message,
        'trace': e.stack.split('\n'),
      });
    }
    return response.json({
      success: true,
      data: fontSetting.serialize(),
    });
  }

  public async index({ params, response }: HttpContextContract) {
    let fontSettings = FontSetting.query().where('font_guid', params.guid);

    return response.json({
      success: true,
      data: fontSettings,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    let fontSetting = await FontSetting.find(params.id);
    if (!fontSetting) {
      return response.json({
        success: false,
        message: 'FontSetting not found',
      });
    }
    try {
      await fontSetting.delete();
    } catch (e) {
      return response.json({
        'success': false,
        'throw message': e.message,
        'trace': e.stack.split('\n'),
        'message': 'Font Setting could not be deleted',
      });
    }
    return response.json({ success: true });
  }
}
