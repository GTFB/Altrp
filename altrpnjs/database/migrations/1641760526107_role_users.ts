import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleUsers extends BaseSchema {
  protected tableName = 'role_user'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('user_id').unsigned()
      table.bigInteger('role_id').unsigned()
      table.string('user_type').defaultTo('App\\User').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('user_id').references('users.id')
      table.foreign('role_id').references('roles.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
