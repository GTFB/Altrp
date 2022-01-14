import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import get_altrp_setting from "../../../../helpers/get_altrp_setting";


export default class AdminController {
  async getSettings({params, response, request, }:HttpContextContract){
    let res = {}
    res[params.setting_name] = get_altrp_setting(params.setting_name, '', request.input( 'decrypt', false ) );
    return response.json(res)
  }

  // async setSettings({params, response, request, }:HttpContextContract){
  //
  // }
}
