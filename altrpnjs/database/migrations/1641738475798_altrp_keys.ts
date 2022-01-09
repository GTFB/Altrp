import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpKeys extends BaseSchema {
  protected tableName = 'altrp_keys'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('onDelete')
      table.string('onUpdate')
      table.string('target_table').index()
      table.string('source_column').index()
      table.string('target_column').index()
      table.integer('source_table_id').unsigned()
      table.integer('user_id').unsigned()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('source_table_id').references('tables.id')
      table.foreign('user_id').references('users.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
