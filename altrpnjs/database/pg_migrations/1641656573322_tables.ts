import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tables extends BaseSchema {
  protected tableName = 'tables'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('title').index()
      table.string('name').unique()
      table.string('description')
      table.bigInteger('user_id').unsigned()
      table.boolean('preset').defaultTo(0)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.foreign('user_id').references('users.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
