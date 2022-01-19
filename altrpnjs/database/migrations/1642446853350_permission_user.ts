import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionUsers extends BaseSchema {
  protected tableName = 'permission_user'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("permission_id").unsigned().references("permissions.id")
      table.integer("user_id").unsigned().references("users.id")
      table.string("user_type")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
