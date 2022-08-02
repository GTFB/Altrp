import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AltrpGlobalTemplateStyles extends BaseSchema {
  protected tableName = 'altrp_global_template_styles';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.text('settings', 'longtext');
      table.string('type');
      table.string('guid', 36);

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
