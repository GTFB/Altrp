import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserMetas extends BaseSchema {
  protected tableName = 'user_metas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("first_name")
      table.string("second_name")
      table.string("patronymic")
      table.integer("user_id").unsigned().references("users.id")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
