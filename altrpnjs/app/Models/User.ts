import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany,
  hasOne,
  HasOne,
  afterCreate, beforeDelete
} from '@ioc:Adonis/Lucid/Orm'
import Role from "App/Models/Role";
import Permission from "App/Models/Permission";
import UserMeta from "App/Models/UserMeta";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public last_name: string

  @column()
  public local_storage: string

  @column()
  public telegram_user_id: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime()
  public last_login_at: DateTime

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

  @afterCreate()
  public static async createUserMeta(user: User) {
    await UserMeta.create({
      user_id: user.id
    })
  }

  @beforeDelete()
  public static async deleteUserMeta(user: User) {
    const userMeta = await UserMeta.query().where("user_id", user.id).first()

    if(userMeta) {
      await userMeta.delete()
    }
  }

  public async hasPermission(value: Permission|number): Promise<boolean> {
    //@ts-ignore
    const relation = this.related("permissions");

    if(typeof value === "object") {
      const permission = await relation.query().where("id", value.id).first();

      return !!permission
    } else if(typeof value === "number") {
      const permission = await relation.query().where("id", value).first();

      return !!permission
    }

    return false
  }

  public async can(value: Permission|number|number[]|Permission[]): Promise<boolean> {

    if(!(value instanceof Array)) {
      if(typeof value === "object" || typeof value === "number") {
        const userPermission = await this.hasPermission(value)

        if(!userPermission) {
          //@ts-ignore
          const roles = await this.related("roles").query()

          let out = false;

          for (let key in roles) {
            // @ts-ignore
            if(await roles[key].hasPermission(value)) {
              out = true
              break;
            }
          }
          return out
        }

        return userPermission
      }
    } else {
      let finalOut = true

      for (let valueKey in value) {
        const userPermission = await this.hasPermission(value[valueKey])

        if(!userPermission) {
          //@ts-ignore
          const roles = await this.related("roles").query()

          let out = false;

          for (let key in roles) {
            // @ts-ignore
            if(await roles[key].hasPermission(value[valueKey])) {
              out = true
              break;
            }
          }

          if(!out) {
            finalOut = false
            break
          }
        }
        return finalOut
      }
    }


    return false
  }

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @hasOne(() => UserMeta)
  public user_meta: HasOne<typeof UserMeta>

  @manyToMany(() => Permission, {
    pivotTable: "permission_user",
    pivotForeignKey: "user_id",
  })
  public permissions: ManyToMany<typeof Permission>

  isAdmin():boolean {
    return false;
  }
}
