import BaseSchema from '@ioc:Adonis/Lucid/Schema'

//2020_03_05_204758_create_templates_table.php
export default class Templates extends BaseSchema {
  protected tableName = 'templates'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string("name").nullable()
      table.string("title").nullable()
      table.text("data", "longtext").nullable()
      table.string("type").nullable()
      table.integer("parent_template").nullable().index()
      table.integer("user_id")
        .unsigned()
        .nullable()
        .references("users.id")
      table.integer("area")
        .defaultTo(1)
        .unsigned()
        .nullable()
        .references("areas.id")
      table.text("html_content", "longtext").nullable()
      table.text("styles", "longtext").nullable()
      table.boolean("all_site").defaultTo(false).index()
      table.uuid("guid")


      table.index("name", "template_name_index")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
