import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpSourcesPermissions extends BaseSchema {
  protected tableName = 'altrp_sources_permissions'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('source_id').unsigned()
      table.bigInteger('permission_id').unsigned()
      table.string('type').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('source_id').references('altrp_sources.id')
      table.foreign('permission_id').references('permissions.id')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
