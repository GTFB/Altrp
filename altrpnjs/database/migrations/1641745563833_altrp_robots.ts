import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpRobots extends BaseSchema {
  protected tableName = 'altrp_robots'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('model_id').unsigned()
      table.bigInteger('user_id').unsigned()
      table.string('name')
      table.string('start_condition')
      table.string('guid', 36).nullable()
      table.text('start_config', 'longtext').nullable()
      table.text('chart', 'longtext')
      table.boolean('enabled').defaultTo(1)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('model_id').references('altrp_models.id')
      table.foreign('user_id').references('users.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
