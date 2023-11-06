import {BaseModel, column, } from "@ioc:Adonis/Lucid/Orm";
import {DateTime} from "luxon";

export default class CategoryObject extends BaseModel{

  public static  table = 'altrp_category_objects'

  @column({ isPrimary: true })
  public id: number


  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime


  @column()
  public category_guid: string

  @column()
  public object_guid: string

  @column()
  public object_type: string
}
