import { DateTime } from 'luxon'
import {BaseModel,
  beforeFetch,
  beforeFind,
  beforePaginate,
  column,
  afterDelete,
  afterCreate,
  afterUpdate,
  ManyToMany,
  manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Category from "App/Models/Category";
import {beforePaginateQuery, softDelete, softDeleteQuery} from "../../helpers/delete";
import Template from "App/Models/Template";
import LIKE from "../../helpers/const/LIKE";
import _ from "lodash";
import exec from "../../helpers/exec";
import base_path from "../../helpers/base_path";
import clearValue from "../../helpers/cache/clearValue";

export default class Menu extends BaseModel {

  public static ALL_MENU_CACHE_KEY = 'ALL_MENU_CACHE_KEY'

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

  public static async getJSON( {
    raw = false,
    moreContent = [],
    content= ''
  }:GetJSONOptions){
    let menus
    if(! content){
      menus = await Menu.all()

    } else {
      menus = await Menu.all()
      menus = menus.filter(menu=>{
        return !! content.indexOf(menu.guid) || moreContent.find(c=>{
          return !!c.indexOf(menu.guid)
        })
      })

    }
    return raw ? menus : JSON.stringify(menus.map(m=>m.toJSON()))

  }

  public async updatePagesFiles(){
    const templates = await  Template.query().where('data', LIKE, `%${this.guid}%`).select('id')

    let pages:any[] = []
    for(let t of templates){
      pages = [...pages,
        ...await Template.getTemplatePagesIds(t.id),]
    }
    pages = _.uniq(pages)
    pages = _.chunk(pages, 3)

    for(let pageIds of pages){
        await exec(`node ${base_path('ace')} generator:page --id=${pageIds}`)

    }

  }

  @afterCreate()
  @afterDelete()
  @afterUpdate()
  static async clearMenuCache(){
    await clearValue(Menu.ALL_MENU_CACHE_KEY)
  }
}
interface GetJSONOptions  {
  raw ?: boolean
  moreContent?: string[]
  content: string
}
