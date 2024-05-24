import BaseSchema from '@ioc:Adonis/Lucid/Schema'

//2020_06_02_145947_create_areas_table.php
export default class Areas extends BaseSchema {
  protected tableName = 'areas'

  public async up () {
    if(! await this.schema.hasTable(this.tableName)) {
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id')

        table.string("name").unique()
        table.text("settings", 'longtext')
        table.string("title")
        table.string("guid", 36).nullable()
        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', {useTz: true})
        table.timestamp('updated_at', {useTz: true})


      })
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
