import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpSources extends BaseSchema {
  protected tableName = 'altrp_sources'

  public async up () {

    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('model_id').unsigned()
      table.bigInteger('controller_id').unsigned()
      table.bigInteger('sourceable_id').unsigned()
      table.string('sourceable_type').nullable()
      table.string('url')
      table.string('api_url')
      table.string('type')
      table.string('request_type')
      table.string('name')
      table.string('title')
      table.boolean('auth').defaultTo(0)
      table.boolean('need_all_roles').defaultTo(0)
      table.text('description').nullable()
      table.text('headers').nullable()
      table.text('bodies').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('model_id').references('altrp_models.id')
      table.foreign('controller_id').references('altrp_controllers.id')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
