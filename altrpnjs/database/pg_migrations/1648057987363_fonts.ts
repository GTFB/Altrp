import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Fonts extends BaseSchema {
  protected tableName = 'altrp_fonts';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('font_family').notNullable();
      table.text('description').nullable();
      table.string('guid').notNullable();
      table.unique(['font_family']);
      table.unique(['guid']);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
