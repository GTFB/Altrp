import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AltrpRelationships extends BaseSchema {
  protected tableName = 'altrp_relationships';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.string('name');
      table.string('type');
      table.string('model_class');
      table.string('foreign_key').nullable();
      table.string('local_key').nullable();
      table.string('title').nullable().index();
      table.text('description').nullable();
      table.bigInteger('model_id').unsigned();
      table.bigInteger('target_model_id').unsigned();
      table.boolean('add_belong_to').defaultTo(0);
      table.boolean('always_with').defaultTo(0);
      table.boolean('editable').defaultTo(0);
      table.text('onDelete').defaultTo('restrict').nullable();
      table.text('onUpdate').defaultTo('restrict').nullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });

      table.foreign('model_id').references('altrp_models.id');
      table.foreign('target_model_id').references('altrp_models.id');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
