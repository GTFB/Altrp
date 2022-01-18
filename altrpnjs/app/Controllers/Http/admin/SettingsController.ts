import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import set_altrp_setting from "../../../../helpers/set_altrp_setting";
import get_altrp_setting from "../../../../helpers/get_altrp_setting";


export default class SettingsController {
  saveSettings({params, response, request, logger}: HttpContextContract) {
    if (!request.input('value')) {
      return response.json({})
    }
    try {
      set_altrp_setting(params.setting_name, request.input('value'), request.input('encrypt'))
    } catch (e) {
      logger.error(e.message)
      return response.json({})
    }
    return response.json({result: true})

  }

  getSettings({params, response, request}: HttpContextContract) {
    let value = get_altrp_setting(params.setting_name, '',request.qs().decrypt)
    return response.json({
      [params.setting_name]: value
    })

  }
}
