import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Menus extends BaseSchema {
  protected tableName = 'menus'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid("guid")
      table.text("children", "longtext")
      table.string("name")
      table.text("settings", "longtext")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true }).nullable()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
