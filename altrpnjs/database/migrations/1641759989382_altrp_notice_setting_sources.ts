import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpNoticeSettingSources extends BaseSchema {
  protected tableName = 'altrp_notice_setting_source'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('notice_setting_id').unsigned()
      table.bigInteger('source_id').unsigned()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('source_id').references('altrp_sources.id')
      table.foreign('notice_setting_id').references('altrp_notice_settings.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
