import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'page_permission'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('page_guid')
      table.string('permission_name')
      table.foreign('permission_name')
        .references('name')
        .inTable('permissions')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.foreign('page_guid')
        .references('guid')
        .inTable('pages')
        .onUpdate('cascade')
        .onDelete('cascade')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
