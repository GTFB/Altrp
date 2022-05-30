import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Category from "App/Models/Category";
import mbParseJSON from "../../helpers/mbParseJSON";
import _ from "lodash"

export default class Area extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public guid: string

  @column()
  public settings: string

  @column()
  public title: string

  public getGuid() {
    return this.guid
  }

  static async getAllWithNames() {
    const areas = await Area.query().preload("categories")

    return areas.map(area => {
      return {
        ...area.serialize(),
        categories: area.categories.map(category => {
          return {
            category: category
          }
        }),
      }
    })
  }

  @manyToMany(() => Category, {
    pivotTable: "altrp_category_objects",
    pivotForeignKey: "object_guid",
    pivotRelatedForeignKey: "category_guid",
    relatedKey: "guid",
    localKey: "guid",
  })
  public categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  /**
   * Проверка является ли область пользовательской
   * @return {[string]}
   */
  getAreaClasses(){
    let CSSclasses : string[] = []
    let setting = mbParseJSON(this.settings,{})

    if (setting) {
      CSSclasses.push(`app-area_id-${this.name}`);
      setting.sidebar_type && CSSclasses.push(`app-area_${setting.sidebar_type}`);
      setting.sidebar_location && CSSclasses.push(`app-area_sidebar-location-${setting.sidebar_location}`);
    }


    return CSSclasses;
  }

  /**
   * Получить пользовательские стили, если они есть
   * @return {string}
   */
  getCustomCSS(){
    let styles = '';

    let setting = mbParseJSON(this.settings)

    if(! _.isString(setting.custom_css)){
      return styles;
    }
    styles = setting.custom_css.replace(/__selector__/g, `.app-area_id-${this.name}`);
    return  styles;
  }


  /**
   * Получить значение настройки
   */
  getSetting(settingName, _default){
    let setting = mbParseJSON(this.settings)
    return _.get(setting, settingName, _default);
  }
}
