import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm';

export default class Category extends BaseModel {
  public static table = 'altrp_categories';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public guid: string;

  @column()
  public title: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @computed()
  public get category() {
    return {
      title: this.title,
      name: this.name,
      description: this.description,
      guid: this.guid,
    };
  }
  public getGuid() {
    return this.guid;
  }
}
