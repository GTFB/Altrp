import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SQLEditors extends BaseSchema {
  protected tableName = 's_q_l_editors'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('title').index()
      table.string('name').index()
      table.text('sql', 'longtext').nullable()
      table.bigInteger('model_id').unsigned()
      table.text('description').nullable()
      table.boolean('is_object').defaultTo(1)

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
