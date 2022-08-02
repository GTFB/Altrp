import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AltrpMetas extends BaseSchema {
  protected tableName = 'altrp_meta';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.string('meta_name').unique();
      table.text('meta_value', 'longtext');
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
      table.timestamp('deleted_at', { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
