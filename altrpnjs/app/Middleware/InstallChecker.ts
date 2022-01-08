import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import appInstallFilesExist from "../../helpers/appInstallFilesExist";

export default class InstallChecker {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    if(! this.altrpInstalled() && request.url() !== '/altrp-install' ){
      await response.redirect('/altrp-install', true)
      return
    }
    await next()
  }

  /**
   * Проверка установки
   */
  altrpInstalled():boolean{
    return appInstallFilesExist();
  }
}
