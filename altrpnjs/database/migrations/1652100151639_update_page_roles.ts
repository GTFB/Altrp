import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdatePageRoles extends BaseSchema {
  protected tableName = 'page_role'

  public async up () {
    this.schema.alterTable(this.tableName, async (table) => {
      try {
        await Database.rawQuery("ALTER TABLE `page_role` CHANGE `page_id` `page_id` BIGINT(10) UNSIGNED NOT NULL; ").exec()
      }
      catch (e) {

      }
      table.foreign('page_id').references('pages.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
