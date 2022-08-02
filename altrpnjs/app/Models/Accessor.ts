import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Accessors extends BaseModel {
  public static table = 'altrp_accessors';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public title: string;

  @column()
  public calculation: string;

  @column()
  public calculation_logic: string;

  @column()
  public description: string;

  @column()
  public test: string;

  @column()
  public model_id: number;

  @column()
  public user_id: number | null;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
