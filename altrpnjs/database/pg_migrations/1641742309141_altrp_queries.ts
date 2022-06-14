import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpQueries extends BaseSchema {
  protected tableName = 'altrp_queries'

  public async up () {

    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name')
      table.string('title')
      table.text('columns', 'longtext')
      table.text('joins', 'longtext')
      table.text('aggregates', 'longtext')
      table.text('conditions', 'longtext')
      table.text('relations', 'longtext')
      table.text('order_by', 'longtext')
      table.text('group_by', 'longtext')
      table.text('access', 'longtext')
      table.string('offset')
      table.string('limit')
      table.bigInteger('user_id').unsigned()
      table.bigInteger('source_id').unsigned()
      table.bigInteger('model_id').unsigned()


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('user_id').references('users.id')
      table.foreign('source_id').references('altrp_sources.id')
      table.foreign('model_id').references('altrp_models.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
