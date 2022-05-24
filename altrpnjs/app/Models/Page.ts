import md5 from 'md5'
import {DateTime} from 'luxon'
import {
  BaseModel,
  beforeDelete,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Models/Model'
import data_get from '../../helpers/data_get'
import empty from '../../helpers/empty'
import recurseMapElements from '../../helpers/recurseMapElements'
import Menu from 'App/Models/Menu'
import ACTIONS_NAMES from '../../helpers/const/ACTIONS_NAMES'
import * as _ from 'lodash'
import ACTIONS_COMPONENTS from '../../helpers/const/ACTIONS_COMPONENTS'
import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User';
import {isString} from 'lodash';
import PageRole from 'App/Models/PageRole';
import Role from 'App/Models/Role';
import Template from 'App/Models/Template';
import Area from 'App/Models/Area';
import Category from 'App/Models/Category';
import PageDatasource from 'App/Models/PageDatasource';
import mbParseJSON from '../../helpers/mbParseJSON';
import DEFAULT_REACT_ELEMENTS from '../../helpers/const/DEFAULT_REACT_ELEMENTS';
import is_array from '../../helpers/is_array';
import validGuid from '../../helpers/validGuid';
import JSONStringifyEscape from "../../helpers/string/JSONStringifyEscape";
import TemplateGenerator from "App/Generators/TemplateGenerator";
import AltrpRouting from "App/Middleware/AltrpRouting";
import PageGenerator from 'App/Generators/PageGenerator'

export default class Page extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @belongsTo(() => Page, {
    foreignKey: 'parent_page_id'
  })
  public parentPage: BelongsTo<typeof Page>

  @column()
  public parent_page_id: number

  @column()
  public content: string

  @column()
  public author: number

  @column()
  public type: string

  @column()
  public guid: string

  @column()
  public path: string

  @column()
  public title: string

  @column()
  public for_guest: boolean

  @column()
  public redirect: string

  @column()
  public seo_description: string

  @column()
  public seoseo_keywords: string

  @column()
  public seo_title: string

  @column()
  public is_cached: boolean

  @column()
  public not_found: boolean

  @column()
  public sections_count: number

  @column()
  public icon: string

  @column()
  public param_name: string

  @column()
  public model_column: string

  @column()

  @column()
  public model_id: number

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Role, {
    pivotTable: 'page_role',
  })
  public roles: ManyToMany<typeof Role>

  // public getAuthor() {
  //   return this.user.email
  // }

  @manyToMany(() => Template, {
    pivotTable: 'pages_templates',
    pivotRelatedForeignKey: 'template_id'
  })
  public templates: ManyToMany<typeof Template>

  @belongsTo(() => Model, {
    foreignKey: 'model_id',
  })
  public model: BelongsTo<typeof Model>

  public getGuid() {
    return this.guid
  }

  @manyToMany(() => Category, {
    pivotTable: 'altrp_category_objects',
    pivotForeignKey: 'object_guid',
    pivotRelatedForeignKey: 'category_guid',
    relatedKey: 'guid',
    localKey: 'guid',
  })
  public categories: ManyToMany<typeof Category>

  static FRONT_DEFAULT_AREAS = [
    'content', 'footer', 'header', 'popups',
  ];

  public async getAreas(deleteContent = false):Promise< {
    area_name: string,
    id: string,
    settings: []
    template?: any
    templates?: Template[]
  }[]> {
    const data: {
      area_name: string,
      id: string,
      settings: []
      template?: any
      templates?: Template[]
    }[] = []

    let headerTemplate = await Template.getTemplate(this.id, 'header')


    data.push({
      area_name: 'header',
      id: 'header',
      settings: [],
      template: headerTemplate
    })
    let contentTemplate = await Template.getTemplate(this.id, 'content')
    data.push({
      area_name: 'content',
      id: 'content',
      settings: [],
      template: contentTemplate
    })

    let footerTemplate = await Template.getTemplate(this.id, 'footer')

    data.push({
      area_name: 'footer',
      id: 'footer',
      settings: [],
      template: footerTemplate
    })

    let _contentAreas = await Area.query().whereNotIn('name', [
      'card', 'popup', 'reports', 'email'
    ]).select('*')

    for (let contentArea of _contentAreas) {

      if (Page.FRONT_DEFAULT_AREAS.indexOf(contentArea.name) != -1) {
        continue
      }
      if (data_get(await Template.getTemplate(this.id, contentArea.name), 'guid')) {

        const template = await Template.getTemplate(this.id, contentArea.name)
        if (template) {
          data.push({
            area_name: contentArea.name,
            id: contentArea.name,
            settings: mbParseJSON(contentArea.settings, []),
            template
          })
        }
      }


    }
    let popups = await Template.getTemplates(this.id, 'popup')

    data.push({
      area_name: 'popups',
      id: 'popups',
      settings: [],
      templates: popups
    })
    if (deleteContent) {
      _.set(headerTemplate, 'html_content', null)
      _.set(contentTemplate, 'html_content', null)
      _.set(footerTemplate, 'html_content', null)
      _.set(headerTemplate, 'styles', null)
      _.set(contentTemplate, 'styles', null)
      _.set(footerTemplate, 'styles', null)
      popups.forEach(t => {
        _.set(t, 'html_content', null)
        _.set(t, 'styles', null)
      })
    }
    return data
  }

  /**
   * Перебирает массив от фронтенда и привязвает/удаляет ролиотмечает for_guest
   * @param {string | array} roles
   */
  public async parseRoles(roles) {
    const rolesValues: number[] = []
    let for_guest = false
    roles.forEach(role => {
      if (!isString(role.value)) {
        rolesValues.push(role.value)
      } else if (role.value === 'guest') {
        for_guest = true
      }
    })
    await this.attachRoles(rolesValues)
    this.for_guest = for_guest
  }


  @hasMany(() => PageDatasource, {
    foreignKey: 'page_id'
  })
  public pageDatasources: HasMany<typeof PageDatasource>

  @hasMany(() => PageDatasource, {
    foreignKey: 'page_id'
  })
  public data_sources: HasMany<typeof PageDatasource>

  /**
   * Привязывает набор ролей к сттанице, удаляя старые связи
   */
  public async attachRoles(roles) {
    if (!this.id) {
      return;
    }

    for (const role_id of roles) {
      const duplicate = await PageRole.query().where("page_id", this.id).andWhere("role_id", role_id).first();

      if(!duplicate) {
        await PageRole.create({
          page_id: this.id,
          role_id: role_id,
        })
      }
    }
  }

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime


  @column.dateTime()
  public deleted_at: DateTime

  async getPageSettings(pageGenerator: PageGenerator): Promise<object> {
    const altrpSettings: any = pageGenerator.__altrp_global__.altrpSettings
    altrpSettings.action_components = []
    altrpSettings.libsToLoad = []
    altrpSettings.altrpMenus = []

    if (!this.id) {
      return altrpSettings
    }
    const fonts: string[] = []
    const areas = await this.getAreas()
    const json_areas = JSON.stringify(areas)
    if (json_areas.indexOf('altrptime') !== -1) {
      altrpSettings.libsToLoad.push('moment')
    }
    const actionTypes: any[] = []
    for (let area of areas) {
      let templates = data_get(area, 'templates')
      if (!templates) {
        templates = [data_get(area, 'template')]
      }
      if (empty(templates)) {
        continue
      }
      for (let template of templates) {
        {
          let root_element = data_get(template, 'data')

          if (_.isString(root_element)) {
            root_element = mbParseJSON(root_element)
          }
          if (root_element) {
            recurseMapElements(root_element, function (element) {

              if (element['name'] === 'menu') {
                const menuGuid = data_get(element, 'settings.menu')
                // const menu = await Menu.query().where('guid', guid).select().first()

                if (menuGuid) {
                  altrpSettings.altrpMenus.push(menuGuid)
                }
              }
              /**
               * get font from element settings
               */
              if (!empty(data_get(element, 'settings.__altrpFonts__'))) {
                const _fonts = _.values(data_get(element, 'settings.__altrpFonts__'))
                _fonts.forEach(font => {
                  if (fonts.indexOf(font) === -1) {
                    fonts.push(font)
                  }
                })
              }
              if (data_get(element, 'settings.tooltip_enable')
                && altrpSettings.libsToLoad.indexOf('blueprint') === -1) {
                altrpSettings.libsToLoad.push('blueprint')
              }

              if (!data_get(element, 'settings.react_element')) {
                return
              }

              let actions: any = []
              for (let actionName of ACTIONS_NAMES) {
                {
                  actions = _.concat(actions, data_get(element, 'settings.' + actionName, []))
                }
                for (let action of actions) {

                  let actionType = data_get(action, 'type')
                  if (actionTypes.indexOf(actionType) === -1) {
                    actionTypes.push(actionType)
                  }
                }
              }
            })

          }
        }
      }
    }
    for (let actionComponent of ACTIONS_COMPONENTS) {
      if (actionTypes.indexOf(actionComponent) !== -1) {
        altrpSettings.action_components.push(actionComponent)
      }
    }

    altrpSettings.altrpMenus = _.uniq(altrpSettings.altrpMenus)
    altrpSettings.altrpMenus =
      (await Promise.all(altrpSettings.altrpMenus
        .map(async (menuGuid) => await Menu.query().where('guid', menuGuid).select('*').first()
        ))).filter(menu => menu)
    pageGenerator.setGlobal('fonts', fonts)

    return altrpSettings
  }


  async allowedForUser(altrpRouting: AltrpRouting): Promise<boolean> {
    const currentUser: User | null = data_get(altrpRouting, '__altrp_global__.currentUser')


    let allowed = false

    /** @var User $user */
    const pageRoleTable = await Database.from('page_role').select('*')
    const pageRoles = pageRoleTable.filter(item => item.page_id === this.id)
    /**
     * Если никаких ролей не указано и for_guest false, то всегда доступно
     */
    if ((!pageRoles.length) && !this.for_guest) {
      return true
    }
    if ((!currentUser) && this.for_guest) {
      return true
    }
    if (!currentUser) {
      return false
    }
    for (let pageRole of pageRoles) {


      let role = await Role.find(pageRole.role_id)
      if (role && await currentUser.hasRole(role.id)) {
        allowed = true
      }
    }
    return allowed
  }

  @beforeDelete()
  public static async deletePage(page: Page) {
    const datasource = await PageDatasource.query().where('page_id', page.id);

    datasource.forEach((source) => {
      source.delete()
    })
  }

  async getPagesForFrontend(): Promise<Page[]> {

    let pages: Page[] = [this]
    let page: Page | null = this
    try {

      while (page && page.parent_page_id) {
        page = await Page.find(page.parent_page_id)
        if (page) {
          pages.push(page)
        }
      }
    } catch (e) {
      Logger.error(e.message)
    }
    return pages
  }

  static getRouteStyles(areas) {
    if (!areas || !_.isArray(areas)) {
      return '';
    }
    let styles = `
      .route-content {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }`

    areas = areas.filter(area => Page.FRONT_DEFAULT_AREAS.indexOf(area.name) === -1)

    if (!areas.length) {
      return styles;
    }
    styles += `.route-content.route-content{`;

    styles += 'display:grid;grid-template-rows:auto 1fr auto;'
    let columnsGrid = '';
    let rightSidebar = areas.find(area => area.getSetting('area_type') === 'sidebar'
      && area.getSetting('sidebar_location') === 'right');
    let leftSidebar = areas.find(area => area.getSetting('area_type') === 'sidebar'
      && area.getSetting('sidebar_location') === 'left');
    columnsGrid += leftSidebar ? `${leftSidebar.getSetting('sidebar_width')}` : '0px';
    columnsGrid += ` calc(100% - ${leftSidebar ? `${leftSidebar.getSetting('sidebar_width')}` : '0px'} - ${rightSidebar ? `${rightSidebar.getSetting('sidebar_width')}` : '0px'}) `;
    columnsGrid += rightSidebar ? `${rightSidebar.getSetting('sidebar_width')}` : '0px';
    let contentRow = '';
    contentRow = leftSidebar ? `left-sidebar content` : `content content`;
    contentRow += rightSidebar ? ` right-sidebar` : ` content`;


    styles += `grid-template-columns:${columnsGrid};grid-template-areas:
        '${(leftSidebar && leftSidebar.getSetting('sidebar_type')) === 'app_sidebar' ? 'left-sidebar' : 'header'} header ${(rightSidebar && rightSidebar.getSetting('sidebar_type')) === 'app_sidebar' ? 'right-sidebar' : 'header'}'
        '${contentRow}'
        '${(leftSidebar && leftSidebar.getSetting('sidebar_type')) === 'app_sidebar' ? 'left-sidebar' : 'footer'} footer ${(rightSidebar && rightSidebar.getSetting('sidebar_type')) === 'app_sidebar' ? 'right-sidebar' : 'footer'}';
        `

    styles += '}'
    styles += '.app-area_sidebar-location-left{grid-area:left-sidebar;overflow:hidden;}'
    styles += '.app-area_sidebar-location-right{grid-area:right-sidebar;overflow:hidden;}'
    styles += '.app-area_header{grid-area:header;}'
    styles += '.app-area_footer{grid-area:footer;}'
    styles += '.app-area_content{grid-area:content;}'
    styles += '.altrp-section.altrp-section--full-width, .altrp-section.altrp-section--boxed{max-width:100%;}  .sections-wrapper{max-width: 100%;width: 100%;}'
    if (rightSidebar) {
      styles += rightSidebar.getCustomCSS();
      if (rightSidebar.getSetting('sidebar_fixed')) {
        styles += `.app-area_sidebar-location-right .sections-wrapper.sections-wrapper.sections-wrapper{overflow:hidden;position:fixed;top:0;right:0;width:${rightSidebar.getSetting('sidebar_width', '0px')};}`
      }
    }
    if (leftSidebar) {
      styles += leftSidebar.getCustomCSS();
      if (leftSidebar.getSetting('sidebar_fixed')) {
        styles += `.app-area_sidebar-location-left .sections-wrapper.sections-wrapper.sections-wrapper{overflow:hidden;position:fixed;top:0;left:0;width:${leftSidebar.getSetting('sidebar_width', '0px')};}`
      }
    }
    styles += `.app-area > .sections-wrapper.sections-wrapper{width:100%;}`
    return styles;
  }

  async getAllStyles(screenName = '') {

    let styles = ''
    let contentStyles = data_get(await Template.getTemplate(this.id, 'content'), 'styles')
    let headerStyles = data_get(await Template.getTemplate(this.id, 'header'), 'styles')

    let areas = await Area.query().whereNotIn('name', [
      'content', 'header', 'footer', 'card', 'popup', 'reports', 'email'
    ])
      .select('name')
    areas = areas.filter((area:Area) => {
      const settings = mbParseJSON(area.settings, {})
      return ! _.get(settings, 'not_content')
    })
    for (let area of areas) {
      let customStyles = data_get(await Template.getTemplate(this.id, area.name), 'styles')
      if (customStyles) {
        customStyles = JSON.parse(customStyles)
        if(screenName && _.get(customStyles, screenName, []).length ) {
          customStyles = _.get(customStyles, screenName, [])
        }else {
          customStyles = _.get(customStyles, 'all_styles', [])
        }
        customStyles = customStyles.map(s => {
          if (s.indexOf('</style>') === -1) {
            s = `
<style id="custom_area_styles_${area.name}">${s}</style>`
            return s
          }
        })
        styles += customStyles.join('')
      }
    }

    if (headerStyles) {
      headerStyles = JSON.parse(headerStyles)

      if(screenName && _.get(headerStyles, screenName, []).length ) {
        headerStyles = _.get(headerStyles, screenName, [])
      }else {
        headerStyles = _.get(headerStyles, 'all_styles', [])
      }

      headerStyles = headerStyles.map(s => {
        if (s.indexOf('</style>') === -1) {
          s = `
<style id="header_style">${s}</style>`
          return s
        }
      })
      styles += headerStyles.join('')
    }
    if (contentStyles) {
      contentStyles = JSON.parse(contentStyles)

      if(screenName && _.get(contentStyles, screenName, []).length ) {
        contentStyles = _.get(contentStyles, screenName, [])
      }else {
        contentStyles = _.get(contentStyles, 'all_styles', [])
      }

      contentStyles = contentStyles.map(s => {
        if (s.indexOf('</style>') === -1) {
          s = `
<style id="content_style">${s}</style>`
          return s
        }
      })
      styles += contentStyles.join('')
    }

    let _contentAreas = await Area.query().whereNotIn('name', [
      'card', 'popup', 'reports', 'email'
    ]).select('*')

    let contentAreas: Area[] = []
    let customAreasCount = 0
    for (let contentArea of _contentAreas) {

      if (Page.FRONT_DEFAULT_AREAS.indexOf(contentArea.name) != -1) {
        contentAreas.push(contentArea)
        continue
      }

      if (data_get(await Template.getTemplate(this.id, contentArea.name), 'guid')) {
        customAreasCount ++
        contentAreas.push(contentArea)
      }

    }
    if(customAreasCount){
      styles += `
<style id="altrp-generated-custom-areas-styles">${Page.getRouteStyles(contentAreas)}</style>`
    }

    return styles
  }

  async getChildrenContent(screenName = '') {
    let prefix = ''
    let cssPrefix = ''
    if(screenName){
      prefix = `/screens/${screenName}`
      cssPrefix = `/${screenName}`
    }
    // @ts-ignore
    let footer:Template = await Template.getTemplate(this.id, 'footer')
    let contentGuid = data_get(await Template.getTemplate(this.id, 'content'), 'guid')
    let footerGuid = data_get(footer, 'guid')
    let headerGuid = data_get(await Template.getTemplate(this.id, 'header'), 'guid')
    const footerHash = footer.html_content ?  encodeURI(md5(footer.html_content)) : ''
    let result = `<div class="app-area app-area_header">
      ${headerGuid ? `@include('altrp${prefix}/templates/header/${headerGuid}')` : ''}
      </div>
      <div class="app-area app-area_content">
      ${contentGuid ? `@include('altrp${prefix}/templates/content/${contentGuid}')` : ''}
      </div>
      <div class="app-area app-area_footer">
      ${footerGuid ? `@include('altrp${prefix}/templates/footer/${footerGuid}')` : ''}
      </div>
      ${footerGuid ? `<link href="/altrp/css${cssPrefix}/${footerGuid}.css?${footerHash}" id="altrp-footer-css-link-${footerGuid}" rel="stylesheet"/>` : ''}
      `

    let areas = await Area.query().whereNotIn('name', [
      'content', 'header', 'footer', 'card', 'popup', 'reports', 'email'
    ])
      .select('*')

    for (let area of areas) {
      const template = await Template.getTemplate(this.id, area.name)
      let customGuid = data_get(template, 'guid')
      if (customGuid) {
        result += `<div class="app-area app-area_${area.name} ${area.getAreaClasses().join(' ')}">
          ${customGuid ? `@include('altrp${prefix}/templates/${area.name}/${customGuid}')` : ''}
          </div>`
      }
    }

    return result

  }

  async extractElementsNames(_only_react_elements = true) {
    let elementNames = [];
    const areas = await this.getAreas(true);

    await Promise.all(areas.map(async area => {
      if (area?.template?.data) {
        let data = area.template.data
        if (_.isString(data)) {
          data = JSON.parse(data)
          area.template.data = data
        }
        await this._extractElementsNames(data, elementNames, _only_react_elements);
      } else {
      }
    }))

    elementNames = _.uniq(elementNames)

    return elementNames;
  }

  async _extractElementsNames(element, elementNames, only_react_elements) {
    let plugins_widget_list: any = ''
    if (!plugins_widget_list) {
      plugins_widget_list = []
    } else {
      plugins_widget_list = plugins_widget_list.split(',')
    }
    if (_.isObject(element.settingsLock)) {
      element.settings = _.merge(element.settings, element.settingsLock)
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
      for (const child of element.children) {
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
      && data_get(element, 'settings.slides_repeater').length > 0) {

      for (const el of data_get(element, 'settings.slides_repeater')) {
        if(el.card_slides_repeater) {
          await this.extractElementsNamesFromTemplate(el.card_slides_repeater, elementNames)
        }
      }
    }
    if (element.name === 'table'
      && data_get(element, 'settings.tables_columns')) {
      let columns = data_get(element, 'settings.tables_columns', [])
      for (let column of columns) {
        if (data_get(column, 'column_template')) {
          await this.extractElementsNamesFromTemplate(data_get(column, 'column_template'), elementNames)
        }
      }
    }
    if (element.name === 'tabs'
      && data_get(element, 'settings.items_tabs')) {
      let tabs = data_get(element, 'settings.items_tabs', [])
      for (let tab of tabs) {
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
      for (let column of columns) {
        if (data_get(column, 'column_template')) {
          this.extractElementsNamesFromTemplate(data_get(column, 'column_template'), elementNames)
        }
      }
    }

  }

  async extractElementsNamesFromTemplate(template_id, elementNames) {
    let template
    if (validGuid(template_id)) {
      template = await Template.query().where('guid', template_id).first();
    } else {
      template = await Template.find(template_id);
    }
    if (!template) {
      return;
    }

    let data = JSON.parse(template.data);
    this._extractElementsNames(data, elementNames, false);
  }


  async renderPageAreas():Promise<string> {
    const areas = await this.getAreas(true)
    let json = '['
    for(const area of areas){
      if(_.isArray(area.templates)){
        for(const {} of area.templates){

          json += JSON.stringify(area).replace(/\//g, '\\/')
          json += ','
        }
        continue
      }
      if(area?.template?.data){
        const _area = {...area}
        delete _area.template
        json += '{'
        for(const key in _area){
          if(_area.hasOwnProperty(key)){
            json += `"${key}":${JSONStringifyEscape(_area[key])},`
          }
        }
        const _template = {...area.template}
        delete _template.data
        json += `"template":{`

        for(const key in _template){
          if(_template.hasOwnProperty(key)){
            json += `"${key}":${JSONStringifyEscape(_template[key])},`
          }
        }
        console.log(_.isString(area.template.data));
        let  data = area.template.data
        if(_.isString(area.template.data)){
          data = JSON.parse(data)
        }
        json +=`"data": ${Page._renderJsonFromElement(data, '') || '{}'}`
        json += `} },`
      }

    }
    json +=']'
    json  = await TemplateGenerator.prepareContent(json)
    return json
  }

  private static _renderJsonFromElement(element, json){

    const settings = {
      ...element.settings,
      ...element.settingsLock
    }
    const {
      conditional_display_choose,
      conditional_roles,
      conditional_permissions,
      react_element,
    } = settings
    if(DEFAULT_REACT_ELEMENTS.indexOf(element.name) === -1 && ! react_element){
      if(_.isArray(element.children)){
        for(const child of element.children){
          json = Page._renderJsonFromElement(child, json)
          if(json){
            json += ','
          }
        }
      }
      return json
    }
    if(conditional_display_choose ||
      (conditional_permissions?.length || conditional_roles?.length)){
      json += `
      @if(allowedForUser(${JSON.stringify(settings).replace(/\//g, '\\/')}, user))~
      `
      json += JSON.stringify(element).replace(/\//g, '\\/')
      json += `
      @end~
      `
    }
    return json
  }

}
