import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PageRoles extends BaseSchema {
  protected tableName = 'page_role'

  public async up () {
    if(! await this.schema.hasTable(this.tableName)) {

      this.schema.createTable(this.tableName, (table) => {
        table.bigInteger('role_id').unsigned()
        table.bigInteger('page_id').unsigned()

        table.foreign('page_id').references('pages.id')
          .onUpdate('cascade').onDelete('cascade');
        table.foreign('role_id').references('roles.id')
          .onUpdate('cascade').onDelete('cascade');

        table.primary(['page_id', 'role_id']);
      })
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
