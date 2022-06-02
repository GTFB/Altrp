import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Timers extends BaseSchema {
  protected tableName = 'timers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.bigInteger("time")
      table.string("time_type")
      table.string("type")
      table.string("value")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
