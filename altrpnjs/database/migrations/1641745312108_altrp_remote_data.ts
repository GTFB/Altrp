import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpRemoteData extends BaseSchema {
  protected tableName = 'altrp_remote_data'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name')
      table.string('column_name').nullable()
      table.string('remote_find_column')
      table.string('remote_need_column')
      table.boolean('as_object').defaultTo(0)
      table.boolean('enabled').defaultTo(1)
      table.bigInteger('column_id').unsigned()
      table.bigInteger('single_source_id').unsigned()
      table.bigInteger('list_source_id').unsigned()
      table.bigInteger('remotable_id').unsigned()
      table.string('remotable_type')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('column_id').references('altrp_columns.id')
      table.foreign('single_source_id').references('altrp_sources.id')
      table.foreign('list_source_id').references('altrp_sources.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
