import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddVariationsToMediaTables extends BaseSchema {
  protected tableName = 'altrp_media'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.json('media_variation').nullable();
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("media_variation")
    })
  }
}
