import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import { isString } from "lodash";
import PageRole from "App/Models/PageRole";

export default class Page extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Page)
  public parent_page_id: BelongsTo<typeof Page>

  @column()
  public content: string

  @column()
  public author: number

  @column()
  public type: string

  @column()
  public guid: string

  @column()
  public path: string

  @column()
  public title: string

  @column()
  public for_guest: boolean

  @column()
  public redirect: string

  @column()
  public seo_description: string

  @column()
  public seoseo_keywords: string

  @column()
  public seo_title: string

  @column()
  public is_cached: boolean

  @column()
  public not_found: boolean

  @column()
  public sections_count: number

  @column()
  public icon: string

  @column()
  public param_name: string

  @column()
  public model_column: string

  @column()
  public model_id: number

  @belongsTo(() => User, {
    foreignKey: "author"
  })
  public user: BelongsTo<typeof User>

  /**
   * Перебирает массив от фронтенда и привязвает/удаляет роли;отмечает for_guest
   * @param {string | array} roles
   */
  public parseRoles( roles )
  {
    const rolesValues: number[] = [];
    let for_guest = false;
    roles.forEach (role => {
      if ( !isString(role.value) ) {
        rolesValues.push(role.value);
      } else if ( role.value === 'guest' ) {
        for_guest = true;
      }
    })
    this.attachRoles( rolesValues );
    this.for_guest = for_guest;
  }

  /**
   * Привязывает набор ролей к сттанице, удаляя старые связи
   * @param {string | array}$roles
   */
  public attachRoles( roles )
    {
      if ( !this.id ) {
      return;
    }

    roles.forEach(async role_id => {
      await PageRole.create({
        page_id: this.id,
        role_id: role_id,
      });
    })
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deleted_at: DateTime
}
