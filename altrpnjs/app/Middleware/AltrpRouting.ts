import getCurrentDevice from "../../helpers/getCurrentDevice";
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page';
import Edge from '../../helpers/edge';
import replaceContentWithData from "../../helpers/replaceContentWithData"
import {matchPath} from 'react-router'
import empty from "../../helpers/empty"
import * as _ from 'lodash'
import User from "App/Models/User";
import Source from "App/Models/Source"
import isProd from "../../helpers/isProd"
import IGNORED_ROUTES from "../../helpers/const/IGNORED_ROUTES"
import get_altrp_setting from "../../helpers/get_altrp_setting";
import stringToObject from "../../helpers/string/stringToObject";
import resource_path from "../../helpers/path/resource_path";
import fs from "fs";

export default class AltrpRouting {

  public __altrp_global__: {
    altrpSettings?: {
      action_components: string[],
      libsToLoad: string[],
      page_params: object,
      altrpMenus: any[]
    };
  } = {}

  setGlobal(path, value) {
    _.set(this.__altrp_global__, path, value)
  }

  getGlobal(path, _default: any = null): any {
    return _.get(this.__altrp_global__, path, _default)
  }

  public async handle(httpContext: HttpContextContract, next: () => Promise<void>) {
    /**
     * Игнорим все запросы кроме get
     */

    if (httpContext.request.method() !== 'GET') {
      await next()
      return
    }
    const url = httpContext.request.url();
    /**
     * Игнорим логинизацию
     */
    for (const route of IGNORED_ROUTES) {
      if (route === url) {
        await next()
        return
      }
    }

    const modulesUrl = httpContext.request.protocol() + "://" + httpContext.request.host() + "/modules";

    if (httpContext.request.completeUrl().split(modulesUrl).length > 1) {
      await next()
      return
    }

    /**
     * Игнорим админку и ajax
     */
    if (url.split('/')[1] === 'admin' || url.split('/')[1] === 'ajax') {
      await next()
      return
    }

    const start = performance.now();
    console.log(performance.now() - start);
    /**
     * init global object
     */
    this.setGlobal('currentUser', httpContext.auth.user)
    if (httpContext.auth.user) {

      // @ts-ignore
      await httpContext.auth.user.load('permissions')
      // @ts-ignore
      await httpContext.auth.user.load('roles')
    }
    this.setGlobal('url', url)
    const altrpSettings: {
      action_components?: [],
      libsToLoad?: [],
      page_params: object,
    } = {
      page_params: httpContext.request.qs(),

    }
    this.setGlobal('altrpSettings', altrpSettings)
    let pageMatch: any = {}
    let page: Page | undefined | null = (await Page.query().whereNull('deleted_at').select('*')).find(page => {
      if (matchPath(url, page.path,)?.isExact) {
        pageMatch = matchPath(url, page.path,)
      }
      return matchPath(url, page.path,)?.isExact
    });
    httpContext.params = pageMatch.params

    if(! page){
      page = await Page.query().where('not_found', true).first()
    }

    if(! page){
      httpContext.response.status(404)
      return httpContext.response.send('page not found')
    }

    if (!await page.allowedForUser(this)) {
      return httpContext.response.redirect(page.redirect || '/')
    }

    await page.load('model');


    // @ts-ignore
    const user: User = httpContext.auth.user
    let is_admin = user && await user.isAdmin();

    let model_data = {}
    if (page.model) {
      try {
        const ModelClass = (await import(`../AltrpModels/${page.model.name}`)).default
        let classInstance
        if (page.param_name && page.model_column && pageMatch?.params[page.param_name]) {
          classInstance = await ModelClass.where(page.model_column, pageMatch.params[page.param_name])
        } else if (pageMatch.params?.id) {
          classInstance = await ModelClass.find(pageMatch.params.id)
        }
        model_data = classInstance ? classInstance.serialize() : {}
      } catch (e) {
        console.error(e);
      }
      if (empty(model_data)) {
        httpContext.response.status(404)
        page = await Page.query().where('not_found', true).first()
        if(! page){
          return httpContext.response.send('page not found')
        }
      }
    }

    let title = replaceContentWithData(page.title, model_data)

    // const datasources= {}
    let altrpuser: any = {
      is_guest: true,
    }
    if (user) {
      altrpuser = user.toObject()
    }
    await page.load('data_sources', data_source => {
      data_source.preload('source', source => {
        source.preload('model', model => {
          model.preload('table')
        })
      })
    })

    const altrpContext = {
      ...pageMatch.params,
      ...model_data,
      altrpuser,
      altrppage: {
        title,
        url,
        params: httpContext.request.qs()
      }
    }
    const datasources = await Source.fetchDatasourcesForPage(page.id, httpContext, altrpContext)
    altrpContext.altrpdata = datasources
    try {
      let path = `altrp/pages/${page.guid}`;
      const device = getCurrentDevice(httpContext.request)
      if (fs.existsSync(resource_path(`views/altrp/screens/${device}/pages/${page.guid}.edge`))) {
        path = `altrp/screens/${device}/pages/${page.guid}`

      }
      console.log(performance.now() - start);
      let res = await httpContext.view.render(path,
        Edge({
          ...altrpContext,
          altrpContext,
          is_admin,
          user,
          csrfToken: httpContext.request.csrfToken,
          isProd: isProd(),
          model_data,
          route_args: pageMatch.params,
          datasources,
          device,
        })
      )
      console.log(performance.now() - start);

      /**
       * Add Custom Headers
       */

      let customHeaders: string | object = get_altrp_setting('altrp_custom_headers', '', true)
      if (customHeaders) {
        customHeaders = replaceContentWithData(customHeaders, altrpContext)
        customHeaders = stringToObject(customHeaders)
        for (let key in customHeaders) {
          if (customHeaders.hasOwnProperty(key)) {
            httpContext.response.header(key, customHeaders[key])
          }
        }
      }

      return httpContext.response.send(res)
    } catch (e) {
      console.error(`Error to View Custom Page: ${e.message}
         ${e.stack}
         `);
      httpContext.response.status(500)
      return httpContext.response.send(`500 Internal Server Error to View Custom Page: ${e.message}
         ${e.stack}
         `)
    }
  }


}
