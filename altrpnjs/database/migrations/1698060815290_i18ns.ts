import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_i18n'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.text('text', 'longtext').notNullable()
      table.text('translated_text', 'longtext').notNullable()
      table.string('domain', 50).index().nullable()
      table.string('iso_lang', 3).index().nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
