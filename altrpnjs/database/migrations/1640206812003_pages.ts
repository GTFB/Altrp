import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Pages extends BaseSchema {
  protected tableName = 'pages';

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id');

        table.string('title', 191).index();
        table.bigInteger('author').unsigned().index();
        table.text('content', 'longtext');
        table.string('path');
        table.string('type').nullable();
        table.string('guid', 36);
        table.bigInteger('parent_page_id').unsigned().nullable().references('pages.id');
        table.boolean('for_guest').defaultTo(false).index();
        table.string('redirect').nullable();
        table.text('seo_description').nullable();
        table.bigInteger('model_id').unsigned().index().nullable();
        table.text('seo_keywords').nullable();
        table.text('seo_title').nullable();
        table.boolean('is_cached').defaultTo(false).index();
        table.boolean('not_found').defaultTo(false).index();
        table.tinyint('sections_count').nullable();
        table.text('icon', 'longtext').nullable();
        table.string('param_name', 50).nullable();
        table.string('model_column', 50).nullable();

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
