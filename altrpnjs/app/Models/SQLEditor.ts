import {BaseModel, BelongsTo, belongsTo, column} from "@ioc:Adonis/Lucid/Orm";
import Model from "App/Models/Model";

export default class SQLEditor extends BaseModel{
  public static table = 's_q_l_editors'

  @column({isPrimary: true})
  public id:number

  @column()
  public title:string

  @column()
  public name:string

  @column()
  public sql:string

  @column()
  public	model_id:number

  @column()
  public description:string

  @column()
  public	is_object:boolean

  @belongsTo(() => Model, {
    foreignKey: "model_id"
  })
  public model: BelongsTo<typeof Model>
}
