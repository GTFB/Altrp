import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'page_data_sources'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('query_sync').defaultTo(0)
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('query_sync')
    })
  }
}
