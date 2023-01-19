
import { DateTime } from 'luxon'
import {BaseModel, beforeFetch, beforeFind, beforePaginate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Category from "App/Models/Category";
import {beforePaginateQuery, softDelete, softDeleteQuery} from "../../helpers/delete";

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public guid: string

  @column({
    consume: value=>JSON.parse(value),
    prepare: value=>JSON.stringify(value),
  })
  public children: string

  @column()
  public name: string

  @column()
  public settings: string

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ })
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeFind()
  public static softDeletesFind = softDeleteQuery;

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery;

  @beforePaginate()
  public static beforePaginate = beforePaginateQuery;

  public delete = async ()=>{
    await softDelete(this)
  }

  public forceDelete = async ()=>{

    try {
      await super.delete()

      return true
    } catch (e) {
      console.error(e)

      return false
    }
  }
}
