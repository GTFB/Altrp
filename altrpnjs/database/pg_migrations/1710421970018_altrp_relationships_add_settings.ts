import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_relationships'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.json('settings')
    })
  }

  public async down() {
    this.schema.table(this.tableName,(table) => {
      table.dropColumn('settings')
    })
  }
}
