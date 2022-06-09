import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropUniqueCustomizers extends BaseSchema {
  protected tableName = 'altrp_customizers'

  public async up () {
    this.schema.table(this.tableName, async (table) => {

      try {
        table.dropIndex('name', 'altrp_customizers_name_unique');
        table.index('name')

      } catch (e) {

      }
    })
  }

  public async down () {

    this.schema.table(this.tableName, (table) => {
      table.index('name')
    })
  }
}
