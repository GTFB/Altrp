import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AltrpDiagrams extends BaseSchema {
  protected tableName = 'altrp_diagrams';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.text('settings', 'longtext');
      table.string('title');
      table.string('guid', 36).unique();
      table.bigInteger('author').unsigned();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });

      table.foreign('author').references('users.id');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
