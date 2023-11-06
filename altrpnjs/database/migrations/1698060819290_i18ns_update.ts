import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_i18n'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('category_guid', 50).index().nullable()
      table.foreign('category_guid').references('guid')
        .inTable('altrp_categories')
        .onUpdate('set null').onDelete('set null')
    })
  }

  public async down () {

    this.schema.table(this.tableName, (table) => {
      table.dropColumn('category_guid')
    })
  }
}
