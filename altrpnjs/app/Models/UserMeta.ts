import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserMeta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public second_name: string

  @column()
  public patronymic: string

  @column({serializeAs: null})
  public user_id: number
}
