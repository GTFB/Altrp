import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {column, beforeSave, BaseModel, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Role from "App/Models/Role";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  /**
   *
   */
  isAdmin():boolean {
    return this.hasRole('admin');
  }

  @manyToMany(() => Role, {
    pivotTable: ''
  })
  public roles: ManyToMany<typeof Role>

  /**
   *
   * @param roles
   * @private
   */
  private hasRole(roles: string|number|Array<string|number>):boolean {
    if(typeof roles === 'string' || typeof roles === 'number'){
      roles = [roles]
    }
    return ! ! roles.filter((roleName)=>{
      return this.roles.map((role:Role)=>{
        if(typeof roleName === 'string'){
          return role.name
        }
        return role.id
      }).indexOf(roleName) !== -1;
    })
  }
}
