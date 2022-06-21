import {DateTime} from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column, ManyToMany, manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Category from "App/Models/Category";

export default class Media extends BaseModel {

  public static table = 'altrp_media'

  @column({isPrimary: true})
  public id: number

  @column()
  public soft_deletes: boolean

  @column()
  public time_stamps: boolean

  @column()
  public filename: string

  @column()
  public url: string

  @column()
  public media_type: string

  @column()
  public type: string

  @column()
  public author: number | null

  @column()
  public title: string

  @column()
  public  alternate_text: string

  @column()
  public caption: string

  @column()
  public description: string

  @column()
  public main_color: string

  @column()
  public guest_token: string

  @column()
  public guid: string

  @column()
  public width: number

  @column()
  public height: number

  @belongsTo(() => User, {
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @manyToMany(() => Category, {
    pivotTable: 'altrp_category_objects',
    relatedKey: 'guid',
    localKey: 'guid',
    pivotForeignKey: 'object_guid',
    pivotRelatedForeignKey: 'category_guid',
  })
  public categories: ManyToMany<typeof Category>

}
