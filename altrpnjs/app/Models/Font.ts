import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import Category from 'App/Models/Category';
import FontSetting from 'App/Models/FontSetting';

export default class Font extends BaseModel {
  public static table = 'altrp_fonts';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public font_family: string;

  @column()
  public description: string;

  @column()
  public guid: string;

  @manyToMany(() => Category, {
    pivotTable: 'altrp_category_objects',
    relatedKey: 'guid',
    localKey: 'guid',
    pivotForeignKey: 'object_guid',
    pivotRelatedForeignKey: 'category_guid',
  })
  public categories: ManyToMany<typeof Category>;

  @hasMany(() => FontSetting, {
    localKey: 'guid',
    foreignKey: 'font_guid',
  })
  public fontSettings: HasMany<typeof FontSetting>;
}
