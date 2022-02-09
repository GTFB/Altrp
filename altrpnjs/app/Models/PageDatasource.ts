import { DateTime } from 'luxon'
import {BaseModel, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Page from "App/Models/Page";

export default class PageDatasource extends BaseModel {
  public static table = "page_data_sources";

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public source_id: number;

  @column({serializeAs: null})
  public page_id: number;

  @column()
  public alias: string;

  @column()
  public parameters: string;

  @column()
  public priority: number;

  @column()
  public page_guid: string;

  @column()
  public autoload: boolean;

  @column()
  public server_side: boolean;

  @hasOne(() => Page, {
    localKey: "page_id",
    foreignKey: "id"
  })
  public pages: HasOne<typeof Page>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
