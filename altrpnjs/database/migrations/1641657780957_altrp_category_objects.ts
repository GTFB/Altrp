import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpCategoryObjects extends BaseSchema {
  protected tableName = 'altrp_category_objects'

  public async up () {
    if(! await this.schema.hasTable(this.tableName)) {

      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id')
        table.string('category_guid', 36)
        table.string('object_guid', 36).index()
        table.string('object_type')

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', {useTz: true})
        table.timestamp('updated_at', {useTz: true})


        table.foreign('category_guid').references('altrp_categories.guid')
          .onUpdate('cascade')
          .onDelete('cascade')
      })
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
