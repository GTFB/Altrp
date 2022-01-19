import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string("name").nullable()
      table.timestamp("last_login_at").nullable()
      table.string("last_name").nullable()
      table.text("local_storage", "longtext").nullable()
      table.string("telegram_user_id").nullable()
    })
  }

  public async down () {
    this.schema.table('users', (table) => {
      table.dropColumns('name', "last_login_at", "last_name", "local_storage", "telegram_user_id")
    })
  }
}
