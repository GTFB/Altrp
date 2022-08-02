import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AltrpNoticeSettings extends BaseSchema {
  protected tableName = 'altrp_notice_settings';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.string('name');
      table.string('noticed_type');
      table.bigInteger('noticed_id').unsigned();
      table.text('notice_settings', 'longtext');

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
