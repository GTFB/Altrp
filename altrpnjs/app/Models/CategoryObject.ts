import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class CategoryObject extends BaseModel {
  public static table = 'altrp_category_objects';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public category_guid: string;

  @column()
  public object_guid: string;

  @column()
  public object_type: string;
}
