import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import { isString } from "lodash";
import PageRole from "App/Models/PageRole";
import Role from "App/Models/Role";
import Template from "App/Models/Template";
import Category from "App/Models/Category";
import defaultAreas from "../../helpers/defaultAreas";
import Area from "App/Models/Area";

export default class Page extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Page, {
    foreignKey: "parent_page_id"
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
  public model: number

  @column()
  public model_id: number

  @belongsTo(() => User, {
    foreignKey: "author"
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Role, {
    pivotForeignKey: "role_id",
    localKey: "id",
    pivotTable: "page_roles"
  })
  public roles: ManyToMany<typeof Role>

  // public getAuthor() {
  //   return this.user.email
  // }

  @manyToMany(() => Template, {
    pivotTable: "pages_templates",
    pivotRelatedForeignKey: "template_id"
  })
  public templates: ManyToMany<typeof Template>

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

    // @ts-ignore
    let headerTemplate = await this.related("templates").query().whereHas("currentArea", (query) => {
      // @ts-ignore
      query.where("name", "header")
    }).first()

    if(!headerTemplate) {
      headerTemplate = await Template.query().where("all_site", true).whereHas("currentArea", (query) => {
        query.where("name", "header")
      }).first()
    }
    if(headerTemplate) {
      const header = headerTemplate.serialize()

      delete header.html_content
      delete header.styles

      data.push({
        area_name: "header",
        id: "header",
        settings: [],
        template: header
      })
    }

    // @ts-ignore
    let contentTemplate = await this.related("templates").query().whereHas("currentArea", (query) => {
      // @ts-ignore
      query.where("name", "content")
    }).first()

    if(!contentTemplate) {
      contentTemplate = await Template.query().where("all_site", true).whereHas("currentArea", (query) => {
        query.where("name", "content")
      }).first()
    }
    if(contentTemplate) {
      const content = contentTemplate.serialize()

      delete content.html_content
      delete content.styles

      data.push({
        area_name: "content",
        id: "content",
        settings: [],
        template: content
      })
    }

    // @ts-ignore
    let footerTemplate = await this.related("templates").query().whereHas("currentArea", (query) => {
      // @ts-ignore
      query.where("name", "footer")
    }).first()

    if(!footerTemplate) {
      footerTemplate = await Template.query().where("all_site", true).whereHas("currentArea", (query) => {
        query.where("name", "footer")
      }).first()
    }
    if(footerTemplate) {
      const footer = footerTemplate.serialize()

      delete footer.html_content
      delete footer.styles

      data.push({
        area_name: "footer",
        id: "footer",
        settings: [],
        template: footer
      })
    }

    let popups: any[] = []

    // @ts-ignore
    let relatedPopups = await this.related("templates").query().whereHas("currentArea", (query) => {
      // @ts-ignore
      query.where("name", "popup")
    })

    if(relatedPopups) {
      popups = [...popups, ...relatedPopups]
    }

    const globalPopups = await Template.query().where("all_site", true).whereHas("currentArea", (query) => {
      query.where("name", "popup")
    })

    if(globalPopups) {
      popups = [...popups, ...globalPopups]
    }

    data.push({
      area_name: "popups",
      id: "popups",
      settings: [],
      templates: popups
    })

    return data
  }

  /**
   * Перебирает массив от фронтенда и привязвает/удаляет роли;отмечает for_guest
   * @param {string | array} roles
   */
  public parseRoles( roles )
  {
    const rolesValues: number[] = [];
    let for_guest = false;
    roles.forEach (role => {
      if ( !isString(role.value) ) {
        rolesValues.push(role.value);
      } else if ( role.value === 'guest' ) {
        for_guest = true;
      }
    })
    this.attachRoles( rolesValues );
    this.for_guest = for_guest;
  }

  public getForFront() {
    return {
      allowed: true,
      areas: [],
      data_sources: [],
      icon: this.icon,
      id: this.id,
      lazy: true,
      model: undefined,
      models: [],
      parent_page_id: this.parent_page_id,
      path: this.path,
      redirect: this.redirect,
      title: this.title
    }
  }

  /**
   * Привязывает набор ролей к сттанице, удаляя старые связи
   * @param {string | array}$roles
   */
  public attachRoles( roles ) {
    if ( !this.id ) {
      return;
    }

    roles.forEach(async role_id => {
      await PageRole.create({
        page_id: this.id,
        role_id: role_id,
      });
    })
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deleted_at: DateTime
}
