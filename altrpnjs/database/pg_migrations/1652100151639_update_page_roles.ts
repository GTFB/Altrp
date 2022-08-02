// import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UpdatePageRoles extends BaseSchema {
  protected tableName = 'page_role';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('page_id').references('pages.id');
    });
  }

  public async down() {}
}
