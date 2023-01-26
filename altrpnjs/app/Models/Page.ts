import purifycss from "purify-css"
import * as mustache from 'mustache'
import {DateTime} from 'luxon'
import {
  BaseModel,
  beforeDelete,
  afterCreate,
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
import AltrpRouting from "App/Controllers/Http/AltrpRouting";
import PageGenerator from 'App/Generators/PageGenerator'
import fs from "fs";
import app_path from "../../helpers/path/app_path";
import applyPluginsFiltersAsync from "../../helpers/plugins/applyPluginsFiltersAsync";
import SCREENS from "../../helpers/const/SCREENS";
import public_path from "../../helpers/path/public_path";
import getResponsiveSetting, {setResponsiveSetting} from "../../helpers/getResponsiveSetting";
import {optimizeStyles} from "../../helpers/screen";
import altrpRandomId from "../../helpers/altrpRandomId";

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

  // private static elementsWithoutSettings = [
  //   'button',
  //   'section',
  //   'section_widget',
  //   'column',
  //   'image',
  // ]
  private static settingsToMigrate = [
    'global_styles_presets',
    'default_hidden',
    'section',
    'section_widget',
    'column',
    'image',
    'conditional_ignore_in_forms',
    'conditional_display_choose',
    'conditional_roles',
    'conditional_other',
    'conditional_other_display',
    'conditions',
    'disabled_enable',
    'conditional_disabled_choose',
    'conditional_disabled_roles',
    'conditional_disabled_permissions',
    'disabled_conditional_other',
    'disabled_conditional_other_display',
    'disabled_conditions',
    'active_enable',
    'conditional_active_choose',
    'conditional_active_roles',
    'conditional_active_permissions',
    'active_conditional_other',
    'active_conditional_other_display',
    'active_conditions',
    'tooltip_show_type',
    'tooltip_enable',
    'tooltip_text',
    'tooltip_position',
    'tooltip_minimal',
    'tooltip_position_padding',
    'tooltip_horizontal_offset',
    'tooltip_vertical_offset',
    'tooltip_font_typographic',
    'tooltip_font_color',
    'tooltip_background_color',
    'tooltip_border_radius',
    'tooltip_background_shadow',
    'hide_on_wide_screen',
    'hide_on_desktop',
    'hide_on_laptop',
    'hide_on_tablet',
    'hide_on_big_phone',
    'hide_on_small_phone',
    'css_class',
    'advanced_element_id',
  ]

  static FRONT_DEFAULT_AREAS = [
    'content', 'footer', 'header', 'popups',
  ];

  public async getAreas(deleteContent = false): Promise<{
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
          if (deleteContent) {
            _.set(template, 'html_content', null)
            _.set(template, 'styles', null)
          }
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
      // if (!isString(role.value)) {
      //   rolesValues.push(role.value)
      // } else if (role.value === 'guest') {
      //   for_guest = true
      // }
      if (!isString(role.value)) {

      }
      if (role.value === 'guest') {
        for_guest = true
      } else {
        rolesValues.push(parseInt(role.value))
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
    foreignKey: 'page_id',
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
      if (!duplicate) {
        await Database.table('page_role')
          .insert({
            page_id: this.id,
            role_id: parseInt(role_id),
          })
      }
    }
  }

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime


  @column.dateTime()
  public deleted_at: DateTime

  async getPageSettings(pageGenerator: PageGenerator): Promise<{
    presets: string[]
  }> {
    const altrpSettings: any = pageGenerator.__altrp_global__.altrpSettings
    altrpSettings.action_components = []
    altrpSettings.libsToLoad = []
    altrpSettings.altrpMenus = []
    altrpSettings.presets = []

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
        .map(async (menuGuid) => {
            let menu
            if (validGuid(menuGuid)) {
              menu = await Menu.query().where('guid', menuGuid).select('*').first()
            } else {
              menu = await Menu.query().where('id', menuGuid).select('*').first()
            }
            return menu
          }
        ))).filter(menu => menu)
    pageGenerator.setGlobal('fonts', fonts)
    altrpSettings.presets = _.uniq(altrpSettings.presets)
    return altrpSettings
  }


  async allowedForUser(altrpRouting: AltrpRouting): Promise<boolean> {
    const currentUser: User | null = data_get(altrpRouting, '__altrp_global__.currentUser')

    let allowed = false

    /** @var User $user */
    const pageRoleTable = await Database.from('page_role').select('*')
    const pageRoles = pageRoleTable.filter(item => item.page_id == this.id)
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
      // @ts-ignore
      if (role && await currentUser.hasRole(parseInt(role.id))) {
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
    applyPluginsFiltersAsync('page_before_delete', page)
  }

  @afterCreate()
  public static async afterCreate(page: Page) {
    applyPluginsFiltersAsync('page_after_create', page)
  }

  async getPagesForFrontend(): Promise<{
    data_sources: {
      source: {
        web_url?: string
      }
    }[]
  }[]> {

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
      console.error(e);
    }
    // @ts-ignore
    return pages.map(p => p.toJSON())
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

  async getAllStyles(html) {
    let styles = ''
    const elements = await this.extractElementsNames(false)
    styles += `<style type="text/css" id="elements_static_styles">`
    for (const elementName of elements) {
      if (fs.existsSync(app_path(`/altrp-templates/styles/elements/${elementName}.css`))) {
        styles += fs.readFileSync(app_path(`/altrp-templates/styles/elements/${elementName}.css`), 'utf8')
      }
    }
    styles += `</style>`
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
        customAreasCount++
        contentAreas.push(contentArea)
      }

    }
    if (customAreasCount) {
      styles += `
<style id="altrp-generated-custom-areas-styles">${Page.getRouteStyles(contentAreas)}</style>`
    }
    let contentStyles = data_get(await Template.getTemplate(this.id, 'content'), 'styles')
    let headerStyles = data_get(await Template.getTemplate(this.id, 'header'), 'styles')

    let areas = await Area.query().whereNotIn('name', [
      'content', 'header', 'footer', 'card', 'popup', 'reports', 'email'
    ])
      .select('name')
    areas = areas.filter((area: Area) => {
      const settings = mbParseJSON(area.settings, {})
      return !_.get(settings, 'not_content')
    })
    const purifycssOptions = {
      minify: true,
      whitelist: [
        '*bp3-popover2-arrow*',
        '*bp3-popover2-content*',
        '*:not*',
        'active',
        'state-disabled',
      ]
    }
    for (let area of areas) {
      let customStyles = data_get(await Template.getTemplate(this.id, area.name), 'styles')
      if (customStyles) {
        try {
          customStyles = JSON.parse(customStyles)
          let _styles: string[] = []

          if (customStyles.important_styles) {
            let important_styles = customStyles.important_styles
            if (_.isArray(important_styles)) {
              important_styles = important_styles.join('')
            }

            _styles = [important_styles]

          } else {
            _.forEach(customStyles, (style: string[], key) => {
              const mediaQuery = SCREENS.find(s => s.name === key)?.fullMediaQuery
              let _style = ''
              _.isArray(style) && (_style = style.map(s => s).join(''))
              if (mediaQuery && key !== 'DEFAULT_BREAKPOINT') {
                _style = `${mediaQuery}{${_style}}`
              }
              _styles.push(_style)
            })
            _styles = _styles.filter(s => s)
          }

          styles += `
<style id="custom_area_styles_${area.name}">${_styles.join('')}</style>`
        } catch (e) {
          console.error(`Page ${this.id} Custom ${area.name} Styles Render Error:`, e);
        }
      }

    }

    if (headerStyles) {
      try {
        headerStyles = JSON.parse(headerStyles)
        let _styles: string[] = []
        if (headerStyles.important_styles) {

          let important_styles = headerStyles.important_styles
          if (_.isArray(important_styles)) {
            important_styles = important_styles.join('')
          }
          _styles = [important_styles]
        } else {
          _.forEach(headerStyles, (style: string[], key) => {
            const mediaQuery = SCREENS.find(s => s.name === key)?.fullMediaQuery
            let _style = ''
            _style = style.map(s => s).join('');
            if (mediaQuery && key !== 'DEFAULT_BREAKPOINT') {
              _style = `${mediaQuery}{${_style}}`
            }
            _styles.push(_style)
          })
          _styles = _styles.filter(s => s)
        }

        styles += `
<style id="header_styles">${_styles.join('')}</style>`
      } catch (e) {
        console.error(`Page ${this.id} Header Styles Render Error:`, e);
      }
    }
    if (contentStyles) {
      try {

        contentStyles = JSON.parse(contentStyles)

        let _styles: any = []
        if (contentStyles.important_styles) {

          let important_styles = contentStyles.important_styles
          if (_.isArray(important_styles)) {
            important_styles = important_styles.join('')
          }

          _styles = [important_styles]

        } else {
          _.forEach(contentStyles, (style: string[], key) => {
            const mediaQuery = SCREENS.find(s => s.name === key)?.fullMediaQuery
            let _style = ''
            _.isArray(style) && (_style = style.map(s => s).join(''))
            if (mediaQuery && key !== 'DEFAULT_BREAKPOINT') {
              _style = `${mediaQuery}{${_style}}`
            }
            _styles.push(_style)

          })
          _styles = _styles.filter(s => s)
        }

        const optimizedStyles = await optimizeStyles(_styles.join(''))
        _styles = []
        optimizedStyles.forEach(([mediaQuery, queryStyles]: string[]) => {
          mediaQuery ? _styles.push(`${mediaQuery}{${queryStyles}}`) : _styles.push(queryStyles)
        })

        _styles = _styles.join('')

        _styles = purifycss(html, _styles, purifycssOptions)
        styles += `
<style id="content_style">${_styles}</style>`
      } catch (e) {
        console.log(`Page ${this.id} Content Styles Render Error:`, e);
      }
    }

    styles = mustache.render(styles, {})

    styles += await Page.generateAccessStyles()

    return styles
  }

  static async generateAccessStyles(): Promise<string> {

    const roles = await Role.all()

    return `<style id="access-styles">
    .front-app:not(.front-app_auth-type-guest) .altrp-element-auth-type_guest{
      display: none;
    }
    .front-app:not(.front-app_auth-type-auth) .altrp-element-auth-type_auth{
      display: none;
    }

    ${roles.map(r => {
      return `
      .altrp-element-role_${r.name}.altrp-element-role_${r.name}{
              display: none;
      }
      .front-app_role-${r.name} .altrp-element-role_${r.name}.altrp-element-role_${r.name}{
              display: flex;
      }
      `
    }).join('')}
    </style>`
  }

  async getChildrenContent(screenName = '') {
    let cssPrefix = ''
    const randomString = altrpRandomId()
    if (screenName) {
      cssPrefix = `/${screenName}`
    }

    // @ts-ignore
    let footer: { guid } | Template = await Template.getTemplate(this.id, 'footer')
    let footerContent = ''
    if (footer instanceof Template) {
      footerContent = await footer.getChildrenContent(screenName)
    } else if (footer?.guid) {
      const _template = await Template.query().where('guid', footer.guid).first()
      if (_template) {
        footerContent = await _template.getChildrenContent(screenName)
      }
    }
    let content = await Template.getTemplate(this.id, 'content')
    let contentGuid = data_get(content, 'guid')
    let contentContent = ''
    if (content instanceof Template) {
      contentContent = await content.getChildrenContent(screenName)
    }
    let footerGuid = data_get(footer, 'guid')

    // @ts-ignore
    let header: { guid } | Template = await Template.getTemplate(this.id, 'header')
    let headerGuid = data_get(header, 'guid')
    let headerContent = ''
    if (header instanceof Template) {
      headerContent = await header.getChildrenContent(screenName)
    } else if (header?.guid) {
      const _template = await Template.query().where('guid', header.guid).first()
      if (_template) {
        headerContent = await _template.getChildrenContent(screenName)
      }
    }

    let contentStyleLink = ''

    if (contentGuid) {
      let cssHref = `/altrp/css${cssPrefix}/${contentGuid}.css`
      if (!fs.existsSync(public_path(cssHref))) {
        cssHref = `/altrp/css/${contentGuid}.css`
      }
      contentStyleLink = `<link href="${cssHref}?${randomString}" id="altrp-content-css-link-${contentGuid}" rel="stylesheet"/>`
    }

    let headerStyleLink = ''

    if (headerGuid) {
      let cssHref = `/altrp/css${cssPrefix}/${headerGuid}.css`
      if (!fs.existsSync(public_path(cssHref))) {
        cssHref = `/altrp/css/${headerGuid}.css`
      }
      headerStyleLink = `<link href="${cssHref}?${randomString}" id="altrp-header-css-link-${headerGuid}" rel="stylesheet"/>`
    }

    let footerStyleLink = ''

    if (footerGuid) {
      let cssHref = `/altrp/css${cssPrefix}/${footerGuid}.css`
      if (!fs.existsSync(public_path(cssHref))) {
        cssHref = `/altrp/css/${footerGuid}.css`
      }
      footerStyleLink = `<link href="${cssHref}?${randomString}" id="altrp-footer-css-link-${footerGuid}" rel="stylesheet"/>`
    }

    let result = `<div class="app-area app-area_header">
      ${headerGuid ? headerContent : ''}
      </div>
      <div class="app-area app-area_content">
      ${contentGuid ? contentContent : ''}
      </div>
      <div class="app-area app-area_footer">
      ${footerGuid ? footerContent : ''}
      </div>
      ${headerStyleLink}
      ${contentStyleLink}
      ${footerStyleLink}
      `

    let areas = await Area.query().whereNotIn('name', [
      'content', 'header', 'footer', 'card', 'popup', 'reports', 'email'
    ])
      .select('*')

    for (let area of areas) {
      const template: Template | {} = await Template.getTemplate(this.id, area.name)
      // @ts-ignore
      if (!template?.guid) {
        continue
      }
      if (template instanceof Template) {
        let content = await template.getChildrenContent(screenName)
        result += `<div class="app-area app-area_${area.name} ${area.getAreaClasses().join(' ')}">
          ${content ? content : ''}
          </div>`
      } else {
        const guid = _.get(template, 'guid')
        if (guid) {
          // @ts-ignore
          const _template = await Template.query().where('guid', guid).first()
          if (_template) {

            let cssHref = `/altrp/css${cssPrefix}/${guid}.css`
            if (!fs.existsSync(public_path(cssHref))) {
              cssHref = `/altrp/css/${guid}.css`
            }
            let content = await _template.getChildrenContent(screenName)
            result += `<div class="app-area app-area_${area.name} ${area.getAreaClasses().join(' ')}">
          ${content ? content : ''}
          </div>
          <link href="${cssHref}?${randomString}" id="altrp-custom-area-css-link-${guid}" rel="stylesheet"/>
          `
          }

        }

      }
    }

    return result

  }

  async extractElementsNames(_only_react_elements = true, presetsStore:string[]| null = null) {
    let elementNames = [];
    const areas = await this.getAreas(true);

    await Promise.all(areas.map(async area => {
      if (area?.template?.data) {
        let data = area.template.data
        if (_.isString(data)) {
          data = JSON.parse(data)
          area.template.data = data
        }
        await this._extractElementsNames(data, elementNames, _only_react_elements,  presetsStore);
      }
    }))

    elementNames = _.uniq(elementNames)
    if(presetsStore){
      presetsStore = _.uniq(presetsStore)
    }
    return elementNames;
  }

  async _extractElementsNames(element, elementNames, only_react_elements,  presetsStore:string[]| null = null) {
    let plugins_widget_list: any = ''
    if (!plugins_widget_list) {
      plugins_widget_list = []
    } else {
      plugins_widget_list = plugins_widget_list.split(',')
    }
    if (_.isObject(element.settingsLock)) {
      element.settings = _.merge(element.settings, element.settingsLock)
    }
    if(presetsStore && element.settings.global_styles_presets){
      presetsStore.push(`${element.name}-${element.settings.global_styles_presets}`)
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
        || data_get(element, 'settings.skeleton:enable')
        || (reactElements.indexOf(element.name) !== -1)))) {
      elementNames.push(element.name)


      if (element.name === 'section'
        || element.name === 'column'
        || element.name === 'section_widget') {

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
        await this._extractElementsNames(child, elementNames, only_react_elements,  presetsStore)
      }
    }
    if (element.name === 'template' && data_get(element, 'settings.template')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.template'), elementNames, presetsStore)
    }
    if (element.name === 'posts' && data_get(element, 'settings.posts_card_template')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.posts_card_template'), elementNames, presetsStore)
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.posts_card_hover_template'), elementNames, presetsStore)
    }
    if (element.name === 'posts' && data_get(element, 'settings.posts_card_hover_template')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.posts_card_hover_template'), elementNames, presetsStore)
    }
    if (element.name === 'table'
      && data_get(element, 'settings.row_expand')
      && data_get(element, 'settings.card_template')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.card_template'), elementNames, presetsStore)
    }
    if (element.name === 'dropbar'
      && data_get(element, 'settings.template_dropbar_section')) {
      await this.extractElementsNamesFromTemplate(data_get(element, 'settings.template_dropbar_section'), elementNames, presetsStore)
    }
    if (element.name === 'carousel'
      && data_get(element, 'settings.slides_repeater', []).length > 0) {

      for (const el of data_get(element, 'settings.slides_repeater')) {
        if (el.card_slides_repeater) {
          await this.extractElementsNamesFromTemplate(el.card_slides_repeater, elementNames, presetsStore)
        }
      }
    }
    if (element.name === 'table'
      && data_get(element, 'settings.tables_columns')) {
      let columns = data_get(element, 'settings.tables_columns', [])
      for (let column of columns) {
        if (data_get(column, 'column_template')) {
          await this.extractElementsNamesFromTemplate(data_get(column, 'column_template'), elementNames, presetsStore)
        }
      }
    }
    if (element.name === 'tabs'
      && data_get(element, 'settings.items_tabs')) {
      let tabs = data_get(element, 'settings.items_tabs', [])
      for (let tab of tabs) {
        if (data_get(tab, 'card_template')) {
          await this.extractElementsNamesFromTemplate(data_get(tab, 'card_template'), elementNames, presetsStore)
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
          await this.extractElementsNamesFromTemplate(data_get(column, 'column_template'), elementNames, presetsStore)
        }
      }
    }

  }

  /**
   *
   * @param template_id
   * @param elementNames
   * @param presetsStore
   */
  async extractElementsNamesFromTemplate(template_id, elementNames, presetsStore?: string[] | null) {
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
    await this._extractElementsNames(data, elementNames, false, presetsStore);
  }


  async renderPageAreas(): Promise<string> {
    const areas = await this.getAreas(true)
    // return JSONStringifyEscape(areas)
    const _areas: any[] = []
    for (const area of areas) {
      if (_.isArray(area.templates)) {
        // continue
        for (const template of area.templates) {

          if (template?.data) {
            template.data = mbParseJSON(template.data, template.data)

            await Page.getDataDependencies(template.data)

          }
        }
      }
      if (area?.template?.data) {
        area.template.data = mbParseJSON(area.template.data, area.template.data)

        await Page.getDataDependencies(area.template.data)

      }
      _areas.push(area)
    }

    return JSONStringifyEscape(_areas)
  }

  static async getDataDependencies(data) {
    if (!data) {
      return
    }
    let _data = _.cloneDeep(data)
    delete _data.children
    for (let settingName in _data.settingsLock) {
      if (_data.settingsLock.hasOwnProperty(settingName)) {
        if (settingName.toLowerCase().indexOf('actions') > -1) {
          delete _data.settingsLock[settingName]
        }
      }
    }
    if (data.settings?.styles) {
      delete data.settings.styles
    }

    for (let settingName in _data.settings) {
      if (_data.settings.hasOwnProperty(settingName)) {
        if (settingName.toLowerCase().indexOf('actions') > -1) {
          delete _data.settings[settingName]
        }
      }
    }
    _data = JSON.stringify(_data)

    if (_.isArray(data.children)) {
      for (const child of data.children) {
        await Page.getDataDependencies(child)
      }
    }
    const dependenciesList = [
      'altrppagestate',
      'altrpdata',
      'altrpforms',
      'altrpmeta',
      'altrpresponses',
    ]
    for (const d of dependenciesList) {
      if (_data.indexOf(d) > -1) {
        (data.dependencies = data.dependencies || []).push(d)
      }
    }
    Page.purgeSettings(data)
  }

  static purgeSettings(data: {
    settings: object,
    settingsLock: object,
    name: string,
  } = {
    name: 'default',
    settings: {},
    settingsLock: {},
  }) {
    const prefixes = [
      'skeleton',
      'hover-transition',
    ]

    if (!Page.coreElements.includes(data.name)) {
      return
    }

    if (_.isObject(data.settings)) {
      prefixes.forEach((prefix) => {
        prefix += ':'
        for (let key in data.settings) {
          if (data.settings.hasOwnProperty(key) && key.startsWith(prefix)) {

            delete data.settings[key]
          }
        }
      })
    }
    if (_.isObject(data.settingsLock)) {
      prefixes.forEach((prefix) => {
        prefix += ':'
        for (let key in data.settingsLock) {
          if (data.settingsLock.hasOwnProperty(key) && key.startsWith(prefix)) {
            delete data.settingsLock[key]
          }
        }
      })
    }

    // if(Page.elementsWithoutSettings.includes(data.name)){
    for (const s of Page.settingsToMigrate) {
      // @ts-ignore
      if (data.settings[s]) {
        // @ts-ignore
        data.settingsLock[s] = data.settings[s]
      }
    }
    const oldSettings = data.settings
    data.settings = {...data.settingsLock}
    _.each(Page.requiredFields, (item, elementName) => {
      if (data.name !== elementName) {
        return
      }
      item.forEach(settingName => {
        for (let s of SCREENS) {
          if (getResponsiveSetting(data.settings, settingName, s.name)) {
            return
          }
          if (getResponsiveSetting(oldSettings, settingName, s.name)) {


            setResponsiveSetting(data.settings, settingName, s.name, getResponsiveSetting(oldSettings, settingName, s.name))
          }
        }
      })
    })
    // @ts-ignore
    delete data.settingsLock
    // }
    _.each(data.settings, (value, key) => {
      if (_.isObject(value) && _.isEmpty(value)) {
        delete data.settings[key]
        return
      }
      if(! value){
        delete data.settings[key]
      }
    })
  }

  async getPopupsGuids() {
    const popups = await Template.getTemplates(this.id, 'popup')
    return popups.map(popup => popup.guid)
  }

  protected static requiredFields = {
    'input-text-common': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-multi-select': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-select': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-radio': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-checkbox': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-wysiwyg': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-textarea': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-image-select': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-accept': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-text-autocomplete': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-date': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-hidden': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-crop-image': [
      'form_id',
      'field_id',
      'content_default_value',
      'content_calculation',
    ],
    'input-date-range': [
      'form_id',
      'field_id',
      'content_default_value_start',
      'content_default_value_end',
    ],
    'input-gallery': [
      'form_id',
      'field_id',
      'default_value',
    ],
    'input-file': [
      'form_id',
      'field_id',
      'default_value',
    ],
    'icon': [
      'icon',
    ],
    'root-element': [
      'close_context',
      'close_right',
      'close_top',
      'popup_close_icon_height_size',
      'popup_close_icon_width_size',
      'close_pa',
      'animations_offcanvas',
      's_direction',
      'time',
      'popup_close_icon',
      'switcher_close_button_popup_layout',
      'overlay_close_popup_layout',
      'heading_close_popup_layout',
      'popup_bg',
      'layout_bg',
      'popup_radius',
      'popup_border_color',
      'popup_border_width',
      'popup_border',
      'popup_pa',
      'content_position_popup_layout',
      'height_custom_popup_layout',
      'height_popup_layout',
      'width_popup_layout',
      'vertical_position_popup_layout',
      'horizontal_position_popup_layout',
      'heading_position_popup_layout',
      'popup_layout_section',
      'type_popup',
    ],
    tabs: [
      'items_tabs',
      'vertical',
      'animate',
    ],
    table: [
      'tables_settings_for_subheading',
      'table_style_table_striple_style',
      'group_subheading_settings',
      'tables_groups',
      'table_style_footer_font',
      'cell_vertical_alignment',
      'table_data_settings_pagination',
      'tables_columns',
      'actions',
      'additional_cells',
      'additional_rows',
      'footer_columns',
      'group_collapsing',
      'collapsed_icon',
      'expanded_icon',
      'group_default_text',
      'group_by_column_name',
      'current_page_text',
      'prev_icon_position',
      'prev_icon',
      'prev_text',
      'next_icon_position',
      'next_icon',
      'next_text',
      'not_found_text',
      'field_name_for_row_styling',
      'table_datasource',
      'choose_datasource',
      'table_data_settings_info',
      'table_data_settings_ordering',
      'table_data_settings_search',
      'table_2_0',
      'table_hover_row',
      'posts_per_page',
      'inner_page_type',
      'inner_page_size',
      'row_expand',
      'card_template',
      'item_size',
      'virtualized_height',
      'virtualized_rows',
      'replace_width',
      'replace_image',
      'replace_text',
      'replace_rows',
      'resize_columns',
      'hide_columns',
      'ids_storage',
      'selected_storage',
      'row_select',
      'row_select_all',
      'row_select_width',
      'checkbox_indeterminate_icon',
      'checkbox_unchecked_icon',
      'checkbox_checked_icon',
      'global_filter_placeholder',
      'global_filter_label',
      'global_filter',
      'inner_page_count_options',
      'loading_text',
      'store_state',
    ],
    section: [
      'layout_content_width_type',
      'link_link',
    ],
    section_widget: [
      'layout_content_width_type',
      'link_link',
    ],
    column: [
      'link_link',
    ],
    posts: [
      'current_page_text',
      'prev_icon_position',
      'prev_icon',
      'prev_text',
      'next_icon_position',
      'next_icon',
      'next_text',
      'not_found_text',
      'field_name_for_row_styling',
      'table_datasource',
      'choose_datasource',
      'table_data_settings_info',
      'table_data_settings_ordering',
      'table_data_settings_search',
      'posts_pagination_section',
      'hide_next_page_button',
      'hide_pre_page_button',
      'is_with_ellipsis',
      'middle_buttons_count',
      'first_last_buttons_count',
      'posts_per_page',
      'posts_pagination_type',
    ],
  }
  private static coreElements = ['root-element',
    'section_widget',
    'heading',
    'image',
    'icon',
    'button',
    'divider',
    'menu',
    'template',
    'tabs',
    'tabs-switcher',
    'accordion',
    'text',
    'breadcrumbs',
    'input-text-common',
    'input-textarea',
    'input-checkbox',
    'input-radio',
    'input-select',
    'input-multi-select',
    'input-slider',
    'input-range-slider',
    'input-text-autocomplete',
    'input-wysiwyg',
    'input-select-tree',
    'input-image-select',
    'input-date',
    'input-date-range',
    'input-gallery',
    'input-crop-image',
    'input-accept',
    'input-hidden',
    'input-file',
    'input-pagination',
    'table',
    'posts',
    'gallery',
    'carousel',
    'map',
    'image-lightbox',
    'dropbar',
    'scheduler',
    'tree',
    'video',
    'html',
    'action-trigger',
    'heading-type-animating',
    'stars',
    'progress-bar',
    'pie-diagram',
    'bar-diagram',
    'line-diagram',
    'funnel-diagram',
    'radar-diagram',
    'tournament',
    'feedback',
    'column',
    'section']
}
