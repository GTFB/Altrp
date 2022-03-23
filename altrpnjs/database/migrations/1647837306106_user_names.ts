import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserNames extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("name", 255).defaultTo("user")
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns('name')
    })
  }
}
