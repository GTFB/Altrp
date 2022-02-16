import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page';
import Edge from '../../helpers/edge';
import Env from '@ioc:Adonis/Core/Env';
// @ts-ignore
import renderResult from '../../helpers/server-render/renderResult'
import replaceContentWithData from "../../helpers/replaceContentWithData";
import prepareContext from "../../helpers/prepareContext";
import {matchPath} from 'react-router'
import empty from "../../helpers/empty";
import * as _ from 'lodash'
import getLatestVersion from "../../helpers/getLatestVersion";
import User from "App/Models/User";
import get_altrp_setting from "../../helpers/get_altrp_setting"
import is_array from "../../helpers/is_array";
import data_get from "../../helpers/data_get";
import recurseMapElements from "../../helpers/recurseMapElements";
import validGuid from "../../helpers/validGuid";
import Template from "App/Models/Template";
import data_set from "../../helpers/data_set";
import DEFAULT_REACT_ELEMENTS from "../../helpers/const/DEFAULT_REACT_ELEMENTS";
// import getCurrentDevice from "../../helpers/getCurrentDevice";
// import Ws from "App/Services/Ws";

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

  getGlobal(path, _default:any = null): any {
    return _.get(this.__altrp_global__, path, _default)
  }

  public async handle({request, response, view, auth}: HttpContextContract, next: () => Promise<void>) {
    /**
     * Игнорим все запросы кроме get
     */
    if (request.method() !== 'GET') {
      await next()
      return
    }
    const url = request.url();
    /**
     * Игнорим логинизацию
     */
    if (url === '/altrp-login'
      || url === '/login'
      || url === '/data/current-user' ||
      url === "/modules/admin/admin.js" ||
      url === "/modules/front-app/front-app.css"
    ) {
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

    /**
     * init global object
     */
    this.setGlobal('currentUser', auth.user)
    if(auth.user){

      // @ts-ignore
      await auth.user.load('permissions')
      // @ts-ignore
      await auth.user.load('roles')
    }
    this.setGlobal('url', url)
    const altrpSettings: {
      action_components?: [],
      libsToLoad?: [],
      page_params: object,
    } = {
      page_params: request.qs(),

    }
    this.setGlobal('altrpSettings', altrpSettings)
    let pageMatch
    const page: Page | undefined = (await Page.query().whereNull('deleted_at').select('*')).find(page => {
      if (matchPath(url, page.path,)?.isExact) {
        pageMatch = matchPath(url, page.path,)
      }
      return matchPath(url, page.path,)?.isExact
    });

    if (page) {
      const pages = await page.getPagesForFrontend();

      if (!await page.allowedForUser(this)) {
        return response.redirect(page.redirect || '/')
      }

      await page.load('templates');
      await page.load('model');

      const altrp_settings = await page.getPageSettings(this)
      const pageAreas = await page.getAreas();
      //@ts-ignore
      const preload_content:any = renderResult({
        protocol: request.protocol(),
        host: request.host(),
        originalUrl: url,
        json: {
          altrp_settings,
          page: pageAreas,
          altrpImageLazy: get_altrp_setting('altrp_image_lazy', 'none'),
          altrpSkeletonColor: get_altrp_setting('altrp_skeleton_color', '#ccc'),
          altrpSkeletonHighlightColor: get_altrp_setting('altrp_skeleton_highlight_color', '#d0d0d0'),
          current_user: auth.user || {is_guest: true}
        }
      })
      let model_data = {}
      if (page.model) {
        try {
          const ModelClass = (await import(`../AltrpModels/${page.model.name}`)).default
          let classInstance
          if (page.param_name && page.model_column) {
            classInstance = await ModelClass.where(page.model_column, pageMatch[page.param_name])
          } else {
            classInstance = await ModelClass.find(pageMatch.params.id)
          }
          model_data = classInstance.serialize()
        } catch (e) {
          console.error(e);
        }
        if (empty(model_data)) {
          response.status(404)
          return response.send('Not Found')
        }
      }
      let title = replaceContentWithData(page.title, model_data)

      const context = prepareContext({
        title,
        model_data,
        altrpRouting: this
      })
      preload_content.content = replaceContentWithData(preload_content.content, context)

      const _frontend_route = page.serialize()


      _frontend_route.title = title
      // @ts-ignore
      const user: User = auth.user
      let is_admin = user && await user.isAdmin();
      const altrpElementsLists = await this.extractElementsNames(pageAreas);
      const v = await view.render('front-app', Edge({
        hAltrp: Env.get('PATH_ENV') === 'production' ? '/modules/front-app/h-altrp.js' : 'http://localhost:3001/src/bundle.h-altrp.js',
        url: Env.get('PATH_ENV') === 'production' ? '/modules/front-app/front-app.js' : 'http://localhost:3001/src/bundle.front-app.js',
        page: pageAreas,
        title: replaceContentWithData(page.title || 'Altrp', context),
        is_admin,
        pages,
        csrfToken: request.csrfToken,
        preload_content,
        page_areas: pageAreas,
        page_id: page.id,
        altrpElementsLists,
        elements_list: altrpElementsLists,
        model_data,
        fonts: this.getFonts(),
        altrp_settings,
        _frontend_route,
        route_args: pageMatch.params,
        altrp: {
          version: getLatestVersion()
        },
      }))
      return response.send(v)
    }
    response.status(404)
    return response.send('Not Found')
  }

  getFonts(): string {
    let fonts: string[] = this.getGlobal('fonts', [])
    return fonts.map(font => {
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
    data_set(altrpSettings, 'templates_data.' + template_id,  template.toArray());

    let data = JSON.parse( template.data );
    this._extractElementsNames( data, elementNames, false );
  }
  async  _extractElementsNames(element, elementNames, only_react_elements) {
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
