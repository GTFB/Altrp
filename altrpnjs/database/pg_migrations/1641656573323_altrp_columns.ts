import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AltrpColumns extends BaseSchema {
  protected tableName = 'altrp_columns';

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id');
        table.string('name').index();
        table.string('title').nullable();
        table.text('description').nullable();
        table.string('type');
        table.bigInteger('size');
        table.boolean('null').nullable();
        table.string('default').nullable();
        table.boolean('primary').nullable();
        table.boolean('unique').nullable();
        table.boolean('is_label').defaultTo(0);
        table.boolean('is_title').defaultTo(0);
        table.boolean('is_auth').defaultTo(0);
        table.boolean('indexed').defaultTo(0);
        table.boolean('editable').defaultTo(0);
        table.boolean('hidden').defaultTo(0);
        table.boolean('preset').defaultTo(0);
        table.string('attribute').nullable();
        table.string('input_type').nullable();
        table.text('options', 'longtext').nullable();
        table.text('calculation_logic').nullable();
        table.text('calculation').nullable();
        table.bigInteger('table_id').unsigned();
        table.bigInteger('user_id').unsigned().nullable();
        table.bigInteger('model_id').unsigned().nullable();

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', { useTz: true });
        table.timestamp('updated_at', { useTz: true });

        table.foreign('user_id').references('users.id');
        table.foreign('model_id').references('altrp_models.id');
        table.foreign('table_id').references('tables.id');
      });
    }
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
