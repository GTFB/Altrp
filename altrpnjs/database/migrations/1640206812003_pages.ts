import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pages extends BaseSchema {
  protected tableName = 'pages'

  public up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string("title", 191).index()
      table.integer("author").index()
      table.text("content", "longtext")
      table.string("path")
      table.string('type').nullable();
      table.uuid("guid")
      table.integer("parent_page_id").unsigned().nullable().references("pages.id")
      table.boolean( 'for_guest' ).defaultTo( false ).index();
      table.string("redirect").nullable()
      table.text("seo_description").nullable()
      table.integer("model_id").unsigned().index()
      table.text("seo_keywords").nullable()
      table.text("seo_title").nullable()
      table.boolean("is_cached").nullable()
      table.boolean("not_found").nullable()
      table.tinyint("sections_count").nullable()
      table.text("icon", "longtext").nullable()
      table.string("param_name", 50).nullable()
      table.string("model_column", 50).nullable()
      // table.bigInteger("model_id").unsigned().nullable()
      // table.foreign("model_id").references("altrp_models.id")

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
