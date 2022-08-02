import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class PageDataSources extends BaseSchema {
  protected tableName = 'page_data_sources';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.bigInteger('source_id').unsigned();
      table.bigInteger('page_id').unsigned();
      table.text('alias');
      table.text('parameters').nullable();
      table.bigInteger('priority').defaultTo(100);
      table.string('page_guid', 36).nullable();
      table.boolean('autoload').defaultTo(1);
      table.boolean('server_side').defaultTo(0);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });

      table.foreign('source_id').references('altrp_sources.id');
      table.foreign('page_id').references('pages.id');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
