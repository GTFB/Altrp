import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class PageRole extends BaseModel {
  public static table = 'page_role';

  @column()
  page_id: number;

  @column()
  role_id: number;
}
