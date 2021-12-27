import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PagesTemplates extends BaseSchema {
  protected tableName = 'pages_templates'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer("page_id").index()
      table.integer("template_id").index()

      table.string("template_type").index()
      table.string("condition_type", 50)
      table.uuid("page_guid")
      table.uuid("template_guid")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
