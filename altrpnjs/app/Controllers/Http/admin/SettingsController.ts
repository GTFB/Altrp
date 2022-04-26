import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import set_altrp_setting from "../../../../helpers/set_altrp_setting"
import get_altrp_setting from "../../../../helpers/get_altrp_setting"
import { exec } from 'child_process'
import path from "path"
import User from "App/Models/User"
import Role from "App/Models/Role"
import {promisify} from "util";

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

   async resetSettings({response, request, auth}: HttpContextContract) {
      const acePath = path.resolve(__dirname, '../../../..', 'ace')

      const userData = request.body()
      const { emailReset, passwordReset } = userData

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
     }catch (e) {
       await user.delete()
       throw(e)
     }

    return response.json({
      success: true
    })

  }

}
