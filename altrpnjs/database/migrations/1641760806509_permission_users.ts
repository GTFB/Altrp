import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionUsers extends BaseSchema {
  protected tableName = 'permission_user'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('permission_id').unsigned()
      table.bigInteger('user_id').unsigned()
      table.string('user_type').nullable()


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('permission_id').references('permissions.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
