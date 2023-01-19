import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Permission from "App/Models/Permission";
import User from "App/Models/User";

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public display_name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  public async hasPermission(value: Permission|number): Promise<boolean> {
    //@ts-ignore
    const relation = this.related("permissions");

    if(typeof value === "object") {
        const permission = await relation.query().where("permissions.id", value.id).first();

        return !!permission
    } else if(Number(value)) {
      const permission = await relation.query().where("permissions.id", value).first();

      return !!permission
    }else if( value ) {
      const permission = await relation.query().where("permissions.name", value).first();

      return !!permission
    }

    return false
  }

  @manyToMany(() => Permission, {
    pivotTable: "permission_role",
    pivotForeignKey: "role_id",
  })
  permissions: ManyToMany<typeof Permission>

  @manyToMany(() => User, {
    pivotTable: 'role_user',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'user_id',
  })
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
