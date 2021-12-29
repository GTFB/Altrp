import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PageRoles extends BaseSchema {
  protected tableName = 'page_roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').unsigned()
      table.integer('page_id').unsigned()

      table.foreign('role_id').references('roles.id')
        .onUpdate('cascade').onDelete('cascade');

      table.primary(['page_id', 'role_id']);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
