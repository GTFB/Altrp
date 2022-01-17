import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from "App/Models/Page";
import Edge from "../../helpers/edge";
import Env from "@ioc:Adonis/Core/Env";
import appInstallFilesExist from "../../helpers/appInstallFilesExist";


export default class AltrpRouting {
  public async handle({request, response, view}: HttpContextContract, next: () => Promise<void>) {
    const url = request.url();
    /**
     * Игнорим все запросы кроме get
     */
    if(request.method() !== 'GET') {
      await next()
      return
    }
    /**
     * Игнорим логинизацию
     */

    if(url === '/altrp-login' || url === '/login'){
      await next()
      return
    }
    /**
     * Игнорим админку
     */
    if(url.split('/')[1] === 'admin'){
      await next()
      return
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
