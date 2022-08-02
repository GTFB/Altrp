import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AltrpMeta from 'App/Models/AltrpMeta';

export default class AltrpMetaController {
  async getMetaByName({ response, params }: HttpContextContract) {
    let meta_name = params.meta_name;
    if (!meta_name) {
      response.status(400);
      return response.json({ success: false, message: 'Need meta name' });
    }
    let altrp_meta = await AltrpMeta.find(meta_name);
    if (!altrp_meta) {
      response.status(404);
      return response.json({ success: false, message: 'Meta not found' });
    }
    return response.json({ success: true, data: altrp_meta });
  }

  async saveMeta({ response, request, params }: HttpContextContract) {
    let meta_name = params.meta_name;
    if (!meta_name) {
      response.status(400);
      return response.json({ success: false, message: 'Need meta name' });
    }
    let meta_data = request.all();
    meta_data['meta_name'] = meta_name;
    let altrp_meta = await AltrpMeta.find(meta_name);
    if (!altrp_meta) {
      altrp_meta = new AltrpMeta();
    }
    altrp_meta.fill(meta_data);

    await altrp_meta.save();

    return response.json({ success: true, data: altrp_meta });
  }
}
