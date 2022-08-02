import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AltrpCustomizers extends BaseSchema {
  protected tableName = 'altrp_customizers';

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id');
        table.string('name').unique();
        table.string('title');
        table.string('type', 50).nullable();
        table.string('guid', 36).unique();
        table.string('model_guid', 36).index();
        table.text('data', 'longtext').nullable();
        table.text('settings', 'longtext').nullable();
        table.bigInteger('model_id').unsigned().nullable();

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', { useTz: true });
        table.timestamp('updated_at', { useTz: true });
        table.timestamp('deleted_at', { useTz: true }).nullable();

        table.foreign('model_id').references('altrp_models.id');
      });
    }
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
