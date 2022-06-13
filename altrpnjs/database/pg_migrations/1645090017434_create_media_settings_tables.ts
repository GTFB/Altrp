import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateMediaSettingsTables extends BaseSchema {
  protected tableName = 'altrp_media_settings'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.integer('width');
      table.integer('height');
      table.string('name');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
