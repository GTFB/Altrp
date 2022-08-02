import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import Model from 'App/Models/Model';
import Column from 'App/Models/Column';

export default class Table extends BaseModel {
  public static table = 'tables';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public bounded_model: string;

  @column()
  public preset: boolean;

  @column()
  public user_id: number | null;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;

  @hasOne(() => Model, {
    foreignKey: 'table_id',
    localKey: 'id',
  })
  public altrp_model: HasOne<typeof Model>;

  @hasMany(() => Column, {
    foreignKey: 'table_id',
  })
  public columns: HasMany<typeof Column>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
