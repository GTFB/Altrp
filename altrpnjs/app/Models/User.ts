import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {column, beforeSave, BaseModel, ManyToMany, manyToMany, computed, hasOne, HasOne,} from '@ioc:Adonis/Lucid/Orm'
import Role from "App/Models/Role";
import UserMeta from "App/Models/UserMeta";
import Permission from "App/Models/Permission";

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({

  })
  public telegram_user_id: string

  @column({ serializeAs: null })
  public password: string

  @computed()
  public get fullName():string{
    if( !this.usermeta){
      return ''
    }
    return `${this.usermeta.first_name} ${this.usermeta.second_name}`
  }

  @column()
  public rememberMeToken: string | null

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
  async isAdmin():Promise<boolean> {
    return await this.hasRole('admin');
  }

  @manyToMany(() => Role, {
    pivotTable: 'role_user',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'user_id',
  })
  public roles: ManyToMany<typeof Permission>

  @manyToMany(() => Permission, {
    pivotTable: 'permission_user',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'permission_id',
    pivotRelatedForeignKey: 'user_id',
  })
  public permissions: ManyToMany<typeof Permission>

  @hasOne(() => UserMeta, {
    foreignKey: 'user_id',
  })
  public usermeta: HasOne<typeof UserMeta>

  /**
   *
   * @param roles
   * @private
   */
  private async hasRole(roles: string|number|Array<string|number>):Promise<boolean> {
    if(typeof roles === 'string' || typeof roles === 'number'){
      roles = [roles]
    }
    // @ts-ignore
    await this.load('roles')

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
