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
import Database from "@ioc:Adonis/Lucid/Database"
import Logger from "@ioc:Adonis/Core/Logger"
import AltrpRouting from "App/Middleware/AltrpRouting"
import User from "App/Models/User";
import { isString } from "lodash";
import PageRole from "App/Models/PageRole";
import Role from "App/Models/Role";
import Template from "App/Models/Template";
import Category from "App/Models/Category";
import PageDatasource from "App/Models/PageDatasource";
import mbParseJSON from "../../helpers/mbParseJSON";

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

  @belongsTo(() => User, {
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Role, {
    pivotForeignKey: 'role_id',
    localKey: 'id',
    pivotTable: 'page_role'
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
    pivotTable: "altrp_category_objects",
    pivotForeignKey: "object_guid",
    pivotRelatedForeignKey: "category_guid",
    relatedKey: "guid",
    localKey: "guid",
  })
  public categories: ManyToMany<typeof Category>

  public async getAreas() {
    // const all_site_templates = Template.query().where("all_site", true).preload("currentArea")

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

    let popups = await Template.getTemplates(this.id, 'popup')

    data.push({
      area_name: 'popups',
      id: 'popups',
      settings: [],
      templates: popups
    })

    return data
  }

  /**
   * Перебирает массив от фронтенда и привязвает/удаляет ролиотмечает for_guest
   * @param {string | array} roles
   */
  public parseRoles(roles) {
    const rolesValues: number[] = []
    let for_guest = false
    roles.forEach(role => {
      if (!isString(role.value)) {
        rolesValues.push(role.value)
      } else if (role.value === 'guest') {
        for_guest = true
      }
    })
    this.attachRoles(rolesValues)
    this.for_guest = for_guest
  }

  public getForFront() {
    return {
      allowed: true,
      areas: [],
      data_sources: [],
      icon: this.icon,
      id: this.id,
      lazy: true,
      models: [],
      parent_page_id: this.parent_page_id,
      path: this.path,
      redirect: this.redirect,
      title: this.title
    }
  }

  @hasMany(() => PageDatasource, {
    foreignKey: "page_id"
  })
  public pageDatasources: HasMany<typeof PageDatasource>
  /**
   * Привязывает набор ролей к сттанице, удаляя старые связи
   */
  public attachRoles( roles ) {
    if ( !this.id ) {
      return;
    }

    roles.forEach(async role_id => {
      await PageRole.create({
        page_id: this.id,
        role_id: role_id,
      })
    })
  }

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate:true })
  public updatedAt: DateTime

  @column.dateTime()
  public deleted_at: DateTime

  async getPageSettings(altrpRouting: AltrpRouting):Promise<object> {
    const altrpSettings: any = altrpRouting.__altrp_global__.altrpSettings
    altrpSettings.action_components = []
    altrpSettings.libsToLoad = []
    altrpSettings.altrpMenus = []

    if (!this.id) {
      return altrpSettings
    }
    const fonts:string[] = []
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

          if(_.isString(root_element)) {
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
              if(! empty(data_get(element, 'settings.__altrpFonts__'))) {
                const _fonts = _.values(data_get(element, 'settings.__altrpFonts__'))
                _fonts.forEach(font =>{
                  if(fonts.indexOf(font) === -1){
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

              let actions:any = []
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
        .map(async (menuGuid) =>  await Menu.query().where('guid', menuGuid).select('*').first()
      ))).filter(menu => menu)
    altrpRouting.setGlobal('fonts', fonts)

    return altrpSettings
  }


  async allowedForUser(altrpRouting:AltrpRouting) {
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
    const datasource = await PageDatasource.query().where("page_id", page.id);

    datasource.forEach((source) => {
      source.delete()
    })
  }

  async getPagesForFrontend():Promise<Page[]> {

    let pages:Page[] = [this]
    let page:Page|null = this
    try {

      while( page && page.parent_page_id ){
        page = await Page.find( page.parent_page_id )
        if( page ){
          pages.push( page )
        }
      }
    } catch( e ){
      Logger.error( e.message )
    }
    return pages
  }
}
