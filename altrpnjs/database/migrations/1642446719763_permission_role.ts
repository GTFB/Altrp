import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionRoles extends BaseSchema {
  protected tableName = 'permission_role'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("permission_id").unsigned().references("permissions.id")
      table.integer("role_id").unsigned().references("roles.id")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
