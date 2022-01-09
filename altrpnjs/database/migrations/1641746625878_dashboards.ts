import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Dashboards extends BaseSchema {
  protected tableName = 'dashboards'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('title')
      table.string('source')
      table.string('type')
      table.text('options', 'longtext').nullable()
      table.text('filter', 'longtext').nullable()
      table.bigInteger('user_id').unsigned()
      table.string('widget_id')
      table.string('guid', 36).unique()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('user_id').references('users.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
