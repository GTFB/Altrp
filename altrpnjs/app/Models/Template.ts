import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  computed,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import Area from 'App/Models/Area';
import Page from 'App/Models/Page';
import TemplateSetting from 'App/Models/TemplateSetting';
import empty from '../../helpers/empty';
import PagesTemplate from 'App/Models/PagesTemplate';
import Category from 'App/Models/Category';
import RootElementRenderer from 'App/Renderers/RootElement';

export default class Template extends BaseModel {
  static historyLimit: number = 5;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public title: string;

  @column()
  public data: string;

  @column()
  public styles: string;

  @column()
  public parent_template: number | null;

  @column()
  public html_content: string;

  @column()
  public type: string;

  @column()
  public guid: string | null;

  @column()
  public all_site: boolean;

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>;

  @manyToMany(() => Page, {
    pivotTable: 'pages_templates',
    pivotForeignKey: 'template_id',
  })
  public pages: ManyToMany<typeof Page>;

  @hasOne(() => Area, {
    localKey: 'area',
    foreignKey: 'id',
  })
  public currentArea: HasOne<typeof Area>;

  @hasMany(() => TemplateSetting, {
    localKey: 'guid',
    foreignKey: 'template_guid',
  })
  public templateSettings: HasMany<typeof TemplateSetting>;

  @manyToMany(() => Category, {
    pivotTable: 'altrp_category_objects',
    pivotForeignKey: 'object_guid',
    pivotRelatedForeignKey: 'category_guid',
    relatedKey: 'guid',
    localKey: 'guid',
  })
  public categories: ManyToMany<typeof Category>;

  @column()
  public area: number;

  @column()
  public user_id: number | null;

  public getGuid() {
    return this.guid;
  }

  public getAuthor() {
    return this.user?.email || '';
  }

  public getArea() {
    return this.currentArea.name;
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @computed()
  get template_type() {
    return this.currentArea?.name || 'content';
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
  static async getTemplate(pageId, templateType = 'content'): Promise<Template | {}> {
    let page = await Page.find(pageId);

    if (!page) {
      return { data: Template.getDefaultData() };
    }

    /**
     * Сначала проверим есть ли конкретный шаблон для страницы
     */

    let template = await Template.query()
      .join('pages_templates', 'templates.guid', '=', 'pages_templates.template_guid')
      .where('pages_templates.condition_type', 'include')
      .where('templates.type', 'template')
      .where('pages_templates.page_guid', page.guid)
      .where('pages_templates.template_type', templateType)
      .select('templates.*')
      .first();

    if (template) {
      let _template = template.serialize();
      _template.data = JSON.parse(template.data);
      if (!_template.data) {
        _template.data = Template.getDefaultData();
      }
      return template;
    }

    /**
     * Потом ищем шаблон, который отмечен 'all_site'
     */
    template = await Template.query()
      .join('areas', 'templates.area', '=', 'areas.id')
      .where('areas.name', templateType)
      .where('templates.type', 'template')
      .where('templates.all_site', 1)
      .select('templates.*')
      .first();

    /**
     * И проверяем, есть ли шаблон в исключениях
     */
    if (
      template &&
      !(await Template.query()
        .join('pages_templates', 'templates.guid', '=', 'pages_templates.template_guid')
        .where('pages_templates.condition_type', 'exclude')
        .where('pages_templates.page_guid', page.guid)
        //@ts-ignore
        .where('templates.guid', template.guid)
        .where('pages_templates.template_type', templateType)
        .first())
    ) {
      //_template.check_elements_conditions();
      let _template = template.serialize();
      _template['data'] = JSON.parse(_template['data']);
      if (empty(_template['data'])) {
        _template['data'] = Template.getDefaultData();
      }
      return _template;
    }
    return { data: Template.getDefaultData() };
  }

  public static async getTemplates(pageId, templateType = 'content') {
    /**
     * Сначала проверим есть ли конкретный шаблон для стрницы
     */

    let templates = await Template.query()
      .join('pages_templates', 'templates.id', '=', 'pages_templates.template_id')
      .where('pages_templates.condition_type', 'include')
      .where('pages_templates.page_id', pageId)
      .where('templates.type', 'template')
      .where('pages_templates.template_type', templateType)
      .select('templates.*');

    /**
     * Потом ищем шаблон, который отмечен 'all_site'
     */
    let _templates = await Template.query()
      .join('areas', 'templates.area', '=', 'areas.id')
      .where('areas.name', templateType)
      .where('templates.type', 'template')
      .where('templates.all_site', 1)
      .select('templates.*');

    /**
     * И проверяем, есть ли шаблон в исключениях
     */

    _templates = _templates.filter(function (_template) {
      let pages_template = PagesTemplate.query()
        .where('template_id', _template.id)
        .where('page_id', pageId)
        .where('condition_type', '=', 'exclude')
        .first();

      return !pages_template;
    });

    templates = templates.concat(_templates);

    templates.forEach((template) => {
      template.data = JSON.parse(template.data);
    });

    return templates;
  }

  dataWithoutContent() {
    // @ts-ignore
    const data = this.toJSON();
    delete data.htmlContent;
    delete data.styles;
    return data;
  }

  async getChildrenContent() {
    try {
      const data = JSON.parse(this.data);
      const renderer = new RootElementRenderer(data);
      return await renderer.render();
    } catch (e) {
      console.log(e);

      return '';
    }
  }
}
