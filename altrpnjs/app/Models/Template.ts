import {DateTime} from 'luxon'
import {
  BaseModel, belongsTo, BelongsTo,
  column, computed,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import Area from "App/Models/Area";
import Page from "App/Models/Page";
import TemplateSetting from "App/Models/TemplateSetting";
import empty from "../../helpers/empty";
import PagesTemplate from "App/Models/PagesTemplate";
import Category from "App/Models/Category";
import RootElementRenderer from "App/Renderers/RootElement";

import validGuid from "../../helpers/validGuid";
import * as _ from "lodash";

export default class Template extends BaseModel {

  static historyLimit: number = 5

  @column({isPrimary: true})
  public id: number

  @column()
  public name: string

  @column()
  public title: string

  @column()
  public data: string

  @column()
  public styles: string

  // @beforeSave()
  // public static async purgeCSS(template: Template): Promise<void> {
  //
  //   let styles = mbParseJSON(template.styles, template.styles)
  //
  //   for(let key in styles){
  //     if(styles.hasOwnProperty(key) && _.isArray(styles[key])){
  //       for(let _k in styles[key])
  //       {
  //         if(styles[key].hasOwnProperty(_k) && _.isString(styles[key][_k])){
  //           let res = await new CleanCSS().minify(styles[key][_k])
  //           if(res.styles){
  //             styles[key][_k] = res.styles
  //           }
  //         }
  //       }
  //     }
  //   }
  //   template.styles = JSON.stringify(styles)
  // }

  @column()
  public parent_template: number | null

  @column()
  public html_content: string

  @column()
  public type: string

  @column()
  public guid: string | null

  @column()
  public all_site: boolean | number

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Page, {
    pivotTable: "pages_templates",
    pivotForeignKey: "template_id",
  })
  public pages: ManyToMany<typeof Page>

  @hasMany(() => PagesTemplate, {
    foreignKey: 'template_id'
  })
  public pages_templates: HasMany<typeof PagesTemplate>

  @hasOne(() => Area, {
    localKey: "area",
    foreignKey: "id"
  })
  public currentArea: HasOne<typeof Area>

  @hasMany(() => TemplateSetting, {
    localKey: 'guid',
    foreignKey: 'template_guid'
  })
  public templateSettings: HasMany<typeof TemplateSetting>

  @manyToMany(() => Category, {
    pivotTable: "altrp_category_objects",
    pivotForeignKey: "object_guid",
    pivotRelatedForeignKey: "category_guid",
    relatedKey: "guid",
    localKey: "guid",
  })
  public categories: ManyToMany<typeof Category>

  @column()
  public area: number

  @column()
  public user_id: number | null

  public getGuid() {
    return this.guid
  }

  public getAuthor() {
    return this.user?.email || ''
  }

  public getArea() {
    return this.currentArea.name
  }

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @computed()
  get template_type() {
    return this.currentArea?.name || 'content'
  }

  static getDefaultData() {

    return {
      name: 'root-element',
      type: 'root-element',
      children: [],
      settings: [],
    };
  }

  /**
   * Получить объект шаблона по параметрам
   */
  static async getTemplate(pageId, templateType = 'content',): Promise<Template | {}> {
    let page = await Page.find(pageId)

    if (!page) {
      return {data: Template.getDefaultData()}
    }

    /**
     * Сначала проверим есть ли конкретный шаблон для страницы
     */

    let template = await Template.query()
      .join('pages_templates', 'templates.guid', '=', 'pages_templates.template_guid')
      .where('pages_templates.condition_type', 'include')
      .where('templates.type', 'template')
      .where('pages_templates.page_guid', page.guid)
      .where('pages_templates.template_type', templateType).select('templates.*').first()

    if (template) {
      let _template = template.serialize()
      _template.data = JSON.parse(template.data)
      if (!_template.data) {
        _template.data = Template.getDefaultData()
      }
      return template
    }


    /**
     * Потом ищем шаблон, который отмечен 'all_site'
     */
    template = await Template.query().join('areas', 'templates.area', '=', 'areas.id')
      .where('areas.name', templateType)
      .where('templates.type', 'template')
      .where('templates.all_site', 1).select('templates.*').first();

    /**
     * И проверяем, есть ли шаблон в исключениях
     */
    if (template && !await Template.query().join('pages_templates', 'templates.guid', '=', 'pages_templates.template_guid')
      .where('pages_templates.condition_type', 'exclude')
      .where('pages_templates.page_guid', page.guid)
      //@ts-ignore
      .where('templates.guid', template.guid)
      .where('pages_templates.template_type', templateType).first()) {
      //_template.check_elements_conditions();
      let _template = template.serialize();
      _template['data'] = JSON.parse(_template['data'],);
      if (empty(_template['data'])) {
        _template['data'] = Template.getDefaultData();
      }
      return _template;
    }
    return {data: Template.getDefaultData()}

  }

  public static async getTemplates(pageId, templateType = 'content') {


    /**
     * Сначала проверим есть ли конкретный шаблон для стрницы
     */

    let templates = await Template.query().join('pages_templates', 'templates.id', '=', 'pages_templates.template_id')
      .where('pages_templates.condition_type', 'include')
      .where('pages_templates.page_id', pageId)
      .where('templates.type', 'template')
      .where('pages_templates.template_type', templateType).select('templates.*');


    /**
     * Потом ищем шаблон, который отмечен 'all_site'
     */
    let _templates = await Template.query().join('areas', 'templates.area', '=', 'areas.id')
      .where('areas.name', templateType)
      .where('templates.type', 'template')
      .where('templates.all_site', 1).select('templates.*');

    /**
     * И проверяем, есть ли шаблон в исключениях
     */

    _templates = (await Promise.all(_templates.map(async function (_template) {
        let pages_template = await PagesTemplate.query().where('template_id', _template.id)
          .where('page_id', pageId)
          .where('condition_type', '=', 'exclude').first();
        return {pages_template, _template};
      }
    ))).filter(({pages_template}) => !pages_template).map(({_template}) => _template);

    templates = templates.concat(_templates);


    templates.forEach((template) => {
        template.data = JSON.parse(template.data)
      }
    )
    ;

    return templates;
  }

  dataWithoutContent() {
    // @ts-ignore
    const data = this.toJSON();
    delete data.htmlContent
    delete data.styles
    return data
  }

  async getChildrenContent(screenName: string, randomString, options: any): Promise<string> {
    const {
      // @ts-ignore
      page = null
    } = (options ||{})
    try {
      const data = JSON.parse(this.data)
      const renderer = new RootElementRenderer(data)
      return await renderer.render(screenName, randomString, {
        template: this,
        page,
      })
    } catch (e) {
      console.error(e)

      return ""
    }
  }

  static async getTemplatePagesIds(template_id) {
    let template
    let pagesTemplates
    if (validGuid(template_id)) {
      pagesTemplates = await PagesTemplate.query().where('template_guid', template_id)
      template = await Template.query().where('guid', template_id)
    } else {
      pagesTemplates = await PagesTemplate.query().where('template_id', template_id)
      template = await Template.find(template_id)
    }
    const excludePages = pagesTemplates.filter(pt => pt.condition_type === 'exclude').map(pt => pt.page_guid)
    const includePages = pagesTemplates.filter(pt => pt.condition_type === 'include').map(pt => pt.page_guid)

    let pages
    if (template.all_site) {
      pages = await Page.query().whereNotIn('guid', excludePages)
    } else {
      pages = await Page.query().whereIn('guid', includePages)
    }


    pages = pages.map(p => p.id)
    return pages
  }

  static templatesElementsProps = {
    'template': [
      'template'
    ],
    'carousel': [
      'card',
      {
        iterable: true,
        propertyName: 'slides_repeater',
        iterablePropertyName: 'card_slides_repeater'
      }
    ],
    'posts': [
      'posts_card_template',
      'posts_card_hover_template',
    ],
    'table': [
      'card_template',
      {
        iterable: true,
        propertyName: 'tables_columns',
        iterablePropertyName: 'column_template'
      }
    ],
    'tabs': [
      {
        iterable: true,
        propertyName: 'items_tabs',
        iterablePropertyName: 'card_template'
      }
    ],
    'dropbar': [
      'template_dropbar_section',
    ],

  }

  public async getInternalTemplatesList(list: string[] | Template[], getTemplate = false): Promise<void> {
    list = list || []


    let data = this.data
    if (_.isString(data)) {
      data = JSON.parse(data)
    }

    await Template._getTemplates(data, list, getTemplate)

  }

  private static async _getTemplates(element: any, list: string[] | Template[], getTemplate: boolean) {
    if (_.isArray(element.children)) {
      for (const _e of element.children) {
        await Template._getTemplates(_e, list, getTemplate)
      }
    }
    const settings = {
      ...element.settings,
      ...element.settingsLock,
    }

    for (let elementName in Template.templatesElementsProps) {
      if (element.name !== elementName) {
        continue
      }

      for (const prop of Template.templatesElementsProps[elementName]) {
        if (_.isString(prop)) {
          const templateGuid = _.get(settings, prop)
          if (!templateGuid) {
            continue
          }
          const template = await Template.query().where('guid', templateGuid).first()
          if (!template) {
            return
          }
          await template.getInternalTemplatesList(list, getTemplate)



          if(getTemplate){
            // @ts-ignore
            list.push(template)
            // @ts-ignore
            list = _.uniqBy(list, 'guid')
          } else {
            list.push(templateGuid)
            // @ts-ignore
            list = _.uniq(list)
          }
        }
      }
    }
  }

}
