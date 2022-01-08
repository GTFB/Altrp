import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from "App/Models/Page";
import Edge from "../../helpers/edge";
import Env from "@ioc:Adonis/Core/Env";
import appInstallFilesExist from "../../helpers/appInstallFilesExist";


export default class AltrpRouting {
  public async handle({request, response, view}: HttpContextContract, next: () => Promise<void>) {
    const url = request.url();
    if(url === '/altrp-install'){
      await next()
      return
    }
    if(! this.altrpInstalled()){
      return response.redirect('/altrp-install', true)
    }

    const page = await Page.query().where("path", url).preload("templates").first();

    if(page) {
      const v = await view.render("front-app", Edge({
        hAltrp: Env.get("PATH_ENV") === "production" ? "/modules/front-app/h-altrp.js" : "http://localhost:3001/src/bundle.h-altrp.js",
        url: Env.get("PATH_ENV") === "production" ? "/modules/front-app/front-app.js" : "http://localhost:3001/src/bundle.front-app.js",
        script: `
          <script>
            window.__altrp_settings__ = ${JSON.stringify({
              action_components: [],
              altrpMenus: [],
              libsToLoad: [],
              page_params: [],
            })}
          </script>
        `
      }))
      return response.send(v)
    } else {
      await next()
    }


  }

  /**
   * Проверка установки
   */
  altrpInstalled():boolean{
    return appInstallFilesExist();
  }
}
