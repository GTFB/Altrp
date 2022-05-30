import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import set_altrp_setting from "../../../../helpers/set_altrp_setting"
import get_altrp_setting from "../../../../helpers/get_altrp_setting"
import {exec} from 'child_process'
import path from "path"
import User from "App/Models/User"
import Role from "App/Models/Role"
import {promisify} from "util";
import isProd from "../../../../helpers/isProd";
import {TelegramBot} from "App/Services/TelegramBot";

export default class SettingsController {
  async saveSettings(httpContext: HttpContextContract) {
    const {params, response, request, logger} = httpContext;

    if (!request.input('value')) {
      return response.json({})
    }

    try {
      await set_altrp_setting(params.setting_name, request.input('value'), request.input('encrypt'))
    } catch (e) {
      logger.error(e.message)
      return response.json({})
    }

    if(params.setting_name === "telegram_bot_token") {
      await TelegramBot.startBotFromSettings(request.input('value'), null, null, httpContext)
    } else if(params.setting_name === "telegram_bot_webhook") {
      await TelegramBot.startBotFromSettings(null, request.input('value'), null, httpContext)
    } else if(params.setting_name === "telegram_bot_keyboard") {
      await TelegramBot.startBotFromSettings(null, null, request.input('value'), httpContext)
    }

    return response.json({result: true})
  }

  getSettings({params, response, request}: HttpContextContract) {
    let value = get_altrp_setting(params.setting_name, '', request.qs().decrypt)
    return response.json({
      [params.setting_name]: value
    })

  }

  async resetSettings({response, request, auth}: HttpContextContract) {
    if(! isProd()){
      return response.json({'success':true})
    }
    const acePath = path.resolve(__dirname, '../../../..', 'ace')

    const userData = request.body()
    const {emailReset, passwordReset} = userData
    if(! emailReset || ! passwordReset){
      response.status(500)
      return response.json({'success':false, 'message': 'Wrong reset data'})
    }
    try {
      await promisify(exec)(`node ${acePath} migration:fresh --force`)
    } catch (e) {
      try {
        await promisify(exec)(`node ${acePath} migration:fresh --force`)
      } catch (e) {
        console.log(e)
      }
    }

    await auth.use("web").logout()

    let user = await User.create({
      email: emailReset,
      name: 'admin',
      password: passwordReset
    })
    try {

      let role = await Role.firstOrCreate({
        name: "admin",
        display_name: 'Admin'
      })
      await user.related('roles').attach({
        [role.id]: {
          user_type: 'App\\User'
        }
      })
    } catch (e) {
      await user.delete()
      throw(e)
    }

    return response.json({
      success: true
    })

  }

}
