import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserMetas extends BaseSchema {
  protected tableName = 'user_metas'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('user_id').unsigned()
      table.string('first_name').nullable()
      table.string('second_name').nullable()
      table.string('patronymic').nullable()


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
