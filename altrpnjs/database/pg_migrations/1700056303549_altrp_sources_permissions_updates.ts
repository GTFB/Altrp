import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_sources_permissions'

  public async up () {
    this.schema.table(this.tableName, (table) => {

      table.dropColumn('created_at')
      table.dropColumn('updated_at')
      table.dropColumn('type')
      table.dropColumn('permission_id')
      table.string('permission_name')
      table.foreign('permission_name')
        .references('name')
        .inTable('permissions')
        .onDelete('cascade')
        .onUpdate('cascade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
