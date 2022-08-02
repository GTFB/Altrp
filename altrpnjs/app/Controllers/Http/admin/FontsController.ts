import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Font from 'App/Models/Font';
import validGuid from '../../../../helpers/validGuid';
import guid from '../../../../helpers/guid';
import _ from 'lodash';

export default class FontsController {
  public async store({ request, response }: HttpContextContract) {
    let font = new Font();
    font.fill(request.all());
    font.guid = guid();

    try {
      await font.save();
    } catch (e) {
      return response.json({
        'success': false,
        'message': "Font don't saved",
        'throw message': e.message,
        'trace': e.stack.split('\n'),
      });
    }
    return response.json({
      success: true,
      data: font,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    let font;
    if (validGuid(params.id)) {
      font = await font.query().where('guid', params.id).first();
    } else {
      font = await Font.find(params.id);
    }
    await font.load('fontSettings');
    if (!font) {
      return response.json({
        success: false,
        message: 'Font not found',
      });
    }
    return response.json({
      success: true,
      data: font,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    let font = await Font.find(params.id);
    if (!font) {
      return response.json({
        success: false,
        message: 'Font not found',
      });
    }
    font.merge(request.all());
    try {
      await font.save();
    } catch (e) {
      console.trace(e);
      response.status(500);
      return response.json({
        'success': false,
        'message': 'Font could not be saved',
        'throw message': e.message,
        'trace': e.stack.split('\n'),
      });
    }
    return response.json({
      success: true,
      data: font.serialize(),
    });
  }

  public async index({ request, response }: HttpContextContract) {
    let search = request.qs().s || '';
    let categories = request.qs() || '';
    let orderColumn = request.qs().order_by || 'font_family';
    let orderType: 'asc' | 'desc' = request.qs()?.order ? request.qs().order.toLowerCase() : 'asc';

    let fonts = Font.query().preload('categories');
    if (fonts && _.isString(categories)) {
      categories = categories.split(',');
      fonts.leftJoin(
        'altrp_category_objects',
        'altrp_category_objects.object_guid',
        '=',
        'altrp_fonts.guid'
      );
      // @ts-ignore
      fonts.whereIn('altrp_category_objects.category_guid', categories);
    }

    if (search) {
      fonts.where(function (query) {
        query
          .where('altrp_fonts.font_family', 'like', '%' + search + '%')
          .orWhere('altrp_fonts.id', 'like', '%' + search + '%');
      });
    }
    fonts.orderBy(orderColumn, orderType);
    const result = await fonts.select('altrp_fonts.*');

    return response.json({
      success: true,
      data: result,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    let font;
    if (validGuid(params.id)) {
      font = await Font.query().where('guid', params.id).first();
    } else {
      font = await Font.find(params.id);
    }
    if (!font) {
      return response.json({
        success: false,
        message: 'Font not found',
      });
    }
    try {
      await font.delete();
    } catch (e) {
      return response.json({
        'success': false,
        'throw message': e.message,
        'trace': e.stack.split('\n'),
        'message': 'Font could not be deleted',
      });
    }
    return response.json({ success: true });
  }
}
