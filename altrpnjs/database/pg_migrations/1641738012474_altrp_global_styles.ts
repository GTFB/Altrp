import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpGlobalStyles extends BaseSchema {
  protected tableName = 'altrp_global_styles'

  public async up () {

    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('title')
      table.text('data', 'longtext')
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
