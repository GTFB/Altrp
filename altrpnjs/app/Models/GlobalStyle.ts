import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class GlobalStyle extends BaseModel {
  public static table = 'altrp_global_template_styles';

  @column({ isPrimary: true })
  public id: number;

  @column({
    serialize: (value: string) => {
      return JSON.parse(value);
    },
  })
  public settings: string;

  @column()
  public type: string;

  @column()
  public guid: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
