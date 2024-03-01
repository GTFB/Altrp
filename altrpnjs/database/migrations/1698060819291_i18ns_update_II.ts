import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_i18n'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.uuid('guid').index().nullable()

    })
  }

  public async down () {

    this.schema.table(this.tableName, (table) => {
      table.dropColumn('guid')
    })
  }
}
