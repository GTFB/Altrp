import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Category from "App/Models/Category";

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
        ...area.$attributes,
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
}
