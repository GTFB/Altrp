import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reports extends BaseSchema {
  protected tableName = 'reports'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name')
      table.string('description')
      table.string('guid', 36).unique().nullable()
      table.text('html', 'longtext').nullable()
      table.text('json', 'longtext').nullable()
      table.text('global', 'longtext').nullable()
      table.bigInteger('user_id').unsigned().nullable()

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
