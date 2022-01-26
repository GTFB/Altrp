import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PageRole extends BaseModel {

  @column()
  page_id: number

  @column()
  role_id: number
}
