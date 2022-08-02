import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Permissions extends BaseSchema {
  protected tableName = 'permissions';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.string('name').unique();
      table.string('display_name');
      table.string('description');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
