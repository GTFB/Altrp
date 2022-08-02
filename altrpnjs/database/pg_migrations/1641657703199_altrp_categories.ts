import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AltrpCategories extends BaseSchema {
  protected tableName = 'altrp_categories';

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id');
        table.string('guid', 36).unique();
        table.string('name');
        table.string('title');
        table.text('description');
      });
    }
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
