import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_models'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.json('settings').nullable()

    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('settings')
    })
  }
}
