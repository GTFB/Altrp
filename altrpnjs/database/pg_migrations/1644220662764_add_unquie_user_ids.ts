import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class AddUniqueUserIds extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    if(! await this.schema.hasColumn(this.tableName, 'guid')){
      this.schema.alterTable(this.tableName, async (table) => {
        table.string("guid").nullable()
      })
    }
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("guid")
    })
  }
}
