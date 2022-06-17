import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DatasourceDashboards extends BaseSchema {
  protected tableName = 'datasource_dashboards'

  public async up () {

    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('guid', 36).unique().nullable()
      table.bigInteger('dashboard_id').unsigned()
      table.bigInteger('user_id').unsigned()
      table.text('settings', 'longtext')

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
