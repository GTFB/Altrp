import {BaseModel, column} from "@ioc:Adonis/Lucid/Orm";
import {DateTime} from "luxon";


export default class SourceRole extends BaseModel{
  public static table = 'altrp_sources_roles'
  @column()
  public source_id: number
  @column()
  public role_id: number
  @column.dateTime({autoCreate:true})
  public created_at: DateTime
  @column.dateTime({autoCreate:true,autoUpdate:true})
  public updated_at: DateTime
}
