import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm';

export default class UserMeta extends BaseModel {
  table = 'usermetas';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public second_name: string;

  @column()
  public patronymic: string;

  @column()
  public user_id: number;
}
