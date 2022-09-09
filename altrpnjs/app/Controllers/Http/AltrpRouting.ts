import * as mustache from'mustache'
import Env from '@ioc:Adonis/Core/Env'
import getCurrentDevice from "../../../helpers/getCurrentDevice";
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page';
import replaceContentWithData from "../../../helpers/string/replaceContentWithData"
import {matchPath} from 'react-router'
import * as _ from 'lodash'
import User from "App/Models/User";
import Source from "App/Models/Source"
import isProd from "../../../helpers/isProd"
import IGNORED_ROUTES from "../../../helpers/const/IGNORED_ROUTES"
import get_altrp_setting from "../../../helpers/get_altrp_setting";
import stringToObject from "../../../helpers/string/stringToObject";
import resource_path from "../../../helpers/path/resource_path";
import fs from "fs";
import JSONStringifyEscape from "../../../helpers/string/JSONStringifyEscape";
import PagesCache from "App/Services/PagesCache";
import Edge from "../../../helpers/edge";
import data_get from "../../../helpers/data_get";
import recurseMapElements from "../../../helpers/recurseMapElements";
import is_array from "../../../helpers/is_array";
import DEFAULT_REACT_ELEMENTS from "../../../helpers/const/DEFAULT_REACT_ELEMENTS";
import validGuid from "../../../helpers/validGuid";
import Template from "App/Models/Template";
import data_set from "../../../helpers/data_set";
import getLatestVersion from "../../../helpers/getLatestVersion";
import FONTS, {SYSTEM_FONT} from "../../../helpers/const/FONTS";
import {promisify} from "util";
import storage_path from "../../../helpers/storage_path";
import isRobot from "../../../helpers/isRobot";

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

  public async index(httpContext: HttpContextContract) {
    /**
     * Игнорим все запросы кроме get
     */

    const url = httpContext.request.url();
    /**
     * Игнорим логинизацию
     */
    for (const route of IGNORED_ROUTES) {
      if (route === url) {
        return
      }
    }

    const modulesUrl = httpContext.request.protocol() + "://" + httpContext.request.host() + "/modules";

    if (httpContext.request.completeUrl().split(modulesUrl).length > 1) {
      return
    }
    const asCheck = isRobot(httpContext.request.headers())

    /**
     * Игнорим админку и ajax
     */
    if (url.split('/')[1] === 'admin' || url.split('/')[1] === 'ajax') {
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
      if (matchPath(decodeURI(url), page.path,)?.isExact) {
        pageMatch = matchPath(decodeURI(url), page.path,)
      }
      return matchPath(decodeURI(url), page.path,)?.isExact
    });
    httpContext.params = pageMatch.params

    if (!page) {
      httpContext.response.status(404)
      page = await Page.query().where('not_found', true).first()
    }

    if (!page) {
      return httpContext.response.send('Not Found')
    }

    if (!await page.allowedForUser(this)) {
      httpContext.response.clearCookie('__altrp_redirect_from')
      httpContext.response.cookie('__altrp_redirect_from', url, {
        maxAge: Date.now() + 864000000,
      })
      return httpContext.response.redirect(page.redirect || '/')
    }

    await page.load('model');


    // @ts-ignore
    const user: User = httpContext.auth.user
    let access_classes = ''
    if(user){
      access_classes += ` front-app_auth-type-auth `

      await user.load('roles')
      await user.load('permissions')

      user.roles && user.roles.forEach(role =>{
        access_classes += ` front-app_role-${role.name} `
        if(role.name === 'admin'){
          access_classes += ` front-app_admin `
        }
      })
      user.permissions && user.permissions.forEach(permission =>{
        access_classes += ` front-app_permission-${permission} `
      })
    } else {
      access_classes += ` front-app_auth-type-guest `
    }
    let model_data = {}
    if (page.model) {
      try {
        const ModelClass = (await import(`../../AltrpModels/${page.model.name}`)).default
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

      if (_.isEmpty(model_data)) {
        httpContext.response.status(404)

        if (!page) {
          httpContext.response.status(404)
          page = await Page.query().where('not_found', true).first()
        }

        if (!page) {
          return httpContext.response.send('Not Found')
        }

        if (!await page.allowedForUser(this)) {
          return httpContext.response.redirect(page.redirect || '/')
        }

        await page.load('model');
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
    // await page.load('data_sources', data_source => {
    //   data_source.preload('source', source => {
    //     source.preload('model', model => {
    //       model.preload('table')
    //     })
    //   })
    // })

    const altrpContext = {
      ...model_data,
        ...pageMatch.params,
      altrpuser,
      altrppage: {
        title,
        url,
        params: httpContext.request.qs()
      }
    }

    const datasources = await Source.fetchDatasourcesForPage(page.id, httpContext, altrpContext)
    const device = getCurrentDevice(httpContext.request)

    altrpContext.altrpdata = datasources
    try {

      console.log(performance.now() - start);
      let content = PagesCache.getCache(page.guid, device)

      if(!content){
        content = fs.readFileSync(resource_path(`views/altrp/screens/${device}/pages/${page.guid}.html`), 'utf8')
        PagesCache.setCache(page.guid, device, content)
      }

      content = mustache.render(content, {
        ...altrpContext,
        altrpContext,
        access_classes,
        asCheck,
        user,
        csrfToken: httpContext.request.csrfToken,
        isProd: isProd(),
        model_data: JSONStringifyEscape(model_data),
        route_args: JSONStringifyEscape(pageMatch.params),
        datasources: JSONStringifyEscape(datasources),
        altrp_skeleton_color: get_altrp_setting('altrp_skeleton_color', '#ccc'),
        altrp_skeleton_highlight_color: get_altrp_setting('altrp_skeleton_highlight_color', '#d0d0d0'),
        altrp_image_lazy: get_altrp_setting('altrp_image_lazy', 'none'),
        container_width: get_altrp_setting('container_width', '1440'),
        device,
      })
      mustache?.templateCache?.clear()
      const [page_areas, all_styles, ] = await Promise.all(
        [
          promisify(fs.readFile)(storage_path(`pages-content/areas/${page.guid}.html`), 'utf8'),
          promisify(fs.readFile)(storage_path(`pages-content/styles/${device}/${page.guid}.html`), 'utf8'),
        ]
      )
      // @ts-ignore
      content = content.replace('<<<page_areas>>>', page_areas)
      content = content.replace('<<<all_styles>>>', all_styles)
      let res = content
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
      console.error(`Error to View Custom Page \`${page.guid}\` : ${e.message}
         ${e.stack}
         `);
      let is_admin = user && await user.isAdmin();

      try{
        return this.tryRenderEdgeTemplate({
          page,
          httpContext,
          device,
          asCheck,
          altrpContext,
          model_data,
          pageMatch,
          is_admin,
          datasources,
          user,
        })
      }catch (e) {

        console.error(`Error to Render Edge Custom Page: ${e.message}
         ${e.stack}
         `);
        httpContext.response.status(500)
      }
      return httpContext.response.send(`500 Internal Server! Error to Render Edge Custom Page: ${e.message}
         ${e.stack}
         `)
    }
  }
  async tryRenderEdgeTemplate({page,
                                httpContext,
                                altrpContext,
                                model_data,
                                asCheck,
                                pageMatch,
                                device,
                                datasources,
                                user,
                                is_admin}){

    try{
      const _frontend_route = page.serialize()

      const pages = await page.getPagesForFrontend();
      const altrp_settings = await page.getPageSettings(this)
      const pageAreas = await page.getAreas(true);
      const altrpElementsLists = await this.extractElementsNames(pageAreas);

      _.set(page, 'templates', [])
      _.set(_frontend_route, 'templates', [])
      let res = await httpContext.view.render(`altrp/pages/${page.guid}`,
        Edge({
          ...altrpContext,
          hAltrp: Env.get('PATH_ENV') === 'production' ? '/modules/front-app/h-altrp.js' : 'http://localhost:3001/src/bundle.h-altrp.js',
          url: Env.get('PATH_ENV') === 'production' ? '/modules/front-app/front-app.js' : 'http://localhost:3001/src/bundle.front-app.js',
          title: replaceContentWithData(page.title || 'Altrp', altrpContext),
          altrpContext,
          is_admin,
          pages,
            asCheck,
          user,
          csrfToken: httpContext.request.csrfToken,
          isProd: isProd(),
          page_areas: pageAreas,
          page_id: page.id,
          altrpElementsLists,
          elements_list: altrpElementsLists,
          model_data,
          fonts: this.getFonts(),
          altrp_settings,
          _frontend_route,
          route_args: pageMatch.params,
          datasources,
          device,
          version: getLatestVersion(),
          _altrp: {
            version: getLatestVersion(),
            isNodeJS: true
          },
        })
      )
      // res = minify(res, {
      //   collapseWhitespace:true,
      //   minifyCSS: true,
      //   minifyJS: true,
      // })

      /**
       * Add Custom Headers
       */

      let customHeaders:string|object = get_altrp_setting('altrp_custom_headers', '', true)
      if(customHeaders){
        customHeaders = replaceContentWithData(customHeaders, altrpContext)
        customHeaders = stringToObject(customHeaders)
        for(let key in customHeaders){
          if(customHeaders.hasOwnProperty(key)){
            httpContext.response.header(key, customHeaders[key])
          }
        }
      }
      return httpContext.response.send(res)
    } catch (e) {
      console.error(`Error to View Custom Page \`${page.guid}\`: ${e.message}
           ${e.stack}
           `);
      httpContext.response.status(500)
      return httpContext.response.send(`500 Internal Server Error to View Custom Page \`${page.guid}\`: ${e.message}
           ${e.stack}
           `)
    }
  }

  getFonts(): string {

    if (get_altrp_setting('altrp_google_fonts_disabled')) {
      return '';
    }

    let fonts: string[] = this.getGlobal('fonts', [])
    return fonts.map(font => {

      if(! _.isString(font)){
        return ''
      }
      if(FONTS[font] === SYSTEM_FONT){
        return ''
      }
      font = encodeURIComponent(font);
      font += ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic'
      let fontUrl = 'https://fonts.googleapis.com/css?family=' + font + '&subset=cyrillic';
      fontUrl = '<link rel="stylesheet"  href="' + fontUrl + '" />'
      return fontUrl
    }).join('')
  }

  async  extractElementsNamesFromTemplate( template_id, elementNames ){
    const altrpSettings: any = this.getGlobal('altrpSettings')
    let template
    if( validGuid( template_id ) ){
      template = await Template.query().where( 'guid', template_id ).first();
    } else {
      template = await Template.find( template_id );
    }
    if( ! template ){
      return;
    }
    data_set(altrpSettings, 'templates_data.' + template_id,  template.dataWithoutContent());

    let data = JSON.parse( template.data );
    this._extractElementsNames( data, elementNames, false );
  }
  async _extractElementsNames(element, elementNames, only_react_elements) {
    let plugins_widget_list: any = ''
    if (!plugins_widget_list) {
      plugins_widget_list = []
    } else {
      plugins_widget_list = plugins_widget_list.split(',')
    }
    const reactElements = _.concat(DEFAULT_REACT_ELEMENTS, plugins_widget_list)
    if (!is_array(elementNames)) {
      elementNames = []
    }
    if (!element.name || !_.isString(element.name)) {
      return
    }
    if (!(only_react_elements
      && !(data_get(element, 'settings.react_element')
        || (reactElements.indexOf(element.name) !== -1)))) {
      elementNames.push(element.name)
      if (element.name === 'section' || element.name === 'column' || element.name === 'section_widget') {

        recurseMapElements(element, function (element) {
            if (element.name && elementNames.indexOf(element.name) === -1) {
              elementNames.push(element.name)
            }
          }
        )

      }
    }
    if (element.children && is_array(element.children)) {
      for(const child of element.children)
      {
        await this._extractElementsNames(child, elementNames, only_react_elements)
      }
    }
    if (element.name === 'template' && data_get(element, 'settings.template')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.template'), elementNames)
    }
    if (element.name === 'posts' && data_get(element, 'settings.posts_card_template')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.posts_card_template'), elementNames)
    }
    if (element.name === 'posts' && data_get(element, 'settings.posts_card_hover_template')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.posts_card_hover_template'), elementNames)
    }
    if (element.name === 'table'
      && data_get(element, 'settings.row_expand')
      && data_get(element, 'settings.card_template')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.card_template'), elementNames)
    }
    if (element.name === 'dropbar'
      && data_get(element, 'settings.template_dropbar_section')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.template_dropbar_section'), elementNames)
    }
    if (element.name === 'carousel'
      && data_get(element, 'settings.slides_repeater')?.length > 0) {

      for (const el of data_get(element, 'settings.slides_repeater')) {
        if(el.card_slides_repeater) {
          await this.extractElementsNamesFromTemplate(el.card_slides_repeater, elementNames)
        }
      }
    }
    if (element.name === 'table'
      && data_get(element, 'settings.tables_columns')) {
      let columns = data_get(element, 'settings.tables_columns', [])
      for(let column of columns)
      {
        if (data_get(column, 'column_template')) {
          await this.extractElementsNamesFromTemplate(data_get(column, 'column_template'), elementNames)
        }
      }
    }
    if (element.name === 'tabs'
      && data_get(element, 'settings.items_tabs')) {
      let tabs = data_get(element, 'settings.items_tabs', [])
      for(let tab of tabs)
      {
        if (data_get(tab, 'card_template')) {
          this.extractElementsNamesFromTemplate(data_get(tab, 'card_template'), elementNames)
        }
      }
    }
    if (element.name === 'table'
      && data_get(element, 'settings.row_expand')
      && data_get(element, 'settings.tables_columns')
      && is_array(data_get(element, 'settings.tables_columns'))) {
      let columns = data_get(element, 'settings.tables_columns')
      for(let column of columns)
      {
        if (data_get(column, 'column_template')) {
          this.extractElementsNamesFromTemplate(data_get(column, 'column_template'), elementNames)
        }
      }
    }

  }
  async  extractElementsNames(areas: any[] = [], _only_react_elements = true){
    let elementNames = [];

    await Promise.all(areas.map(async area => {
      if(area?.template?.data) {
        let data = area.template.data
        if(_.isString(data)){
          data= JSON.parse(data)
          area.template.data=data
        }
        await this._extractElementsNames( data, elementNames, _only_react_elements );
      } else {
      }
    }))
    // elementNames = array_unique( elementNames );
    // elementNames = array_values( elementNames );
    elementNames = _.uniq(elementNames)

    return elementNames;
  }
}
