import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Font from 'App/Models/Font';

export default class FontSetting extends BaseModel {
  public static table = 'altrp_font_settings';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public src: string;

  @column()
  public font_weight: string;

  @column()
  public font_style: string;

  @column()
  public font_variant: string;

  @column()
  public font_stretch: string;

  @column()
  public font_guid: string;

  @belongsTo(() => Font, {
    foreignKey: 'font_guid',
  })
  public altrp_font: BelongsTo<typeof Font>;
}
