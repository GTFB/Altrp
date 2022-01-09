import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpMedias extends BaseSchema {
  protected tableName = 'altrp_media'

  public async up () {

    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('author').unsigned()
      table.bigInteger('width')
      table.bigInteger('height')
      table.string('filename')
      table.string('url')
      table.string('media_type').index()
      table.string('type').index().nullable()
      table.string('title').index().nullable()
      table.string('alternate_text').index().nullable()
      table.string('caption').nullable()
      table.string('description').nullable()
      table.string('main_color', 10).nullable()
      table.string('guest_token', 40).nullable()
      table.string('guid', 36).nullable()



      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })

      table.foreign('author').references('users.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
