import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpCategoryObjects extends BaseSchema {
  protected tableName = 'altrp_category_objects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid("category_guid")
      table.uuid("object_guid")
      table.string("object_type")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
