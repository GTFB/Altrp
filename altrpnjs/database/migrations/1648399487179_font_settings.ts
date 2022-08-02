import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class FontSettings extends BaseSchema {
  protected tableName = 'altrp_font_settings';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.json('src').notNullable();
      table.string('font_weight').nullable();
      table.string('font_style').nullable();
      table.string('font_variant').nullable();
      table.string('font_stretch').nullable();
      table.string('font_guid').notNullable();

      table.foreign('font_guid').references('altrp_fonts.guid');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
