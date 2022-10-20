import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddVariationsToMediaTables extends BaseSchema {
  protected tableName = 'altrp_media'

  public async up () {

    if(await this.schema.hasColumn(this.tableName, 'media_variation')){
      return
    }
    this.schema.alterTable(this.tableName,  (table) => {

      table.text('media_variation', 'longtext').nullable();
    })

  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("media_variation")
    })
  }
}
