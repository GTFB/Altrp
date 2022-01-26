import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Robots extends BaseSchema {
  protected tableName = 'altrp_robots'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name")
      table.integer("user_id").unsigned().references("users.id")
      table.integer("model_id")
      table.string("start_condition")
      table.string("start_config")
      table.boolean("enabled").defaultTo(true)
      table.text("chart", "longtext")
      table.uuid("guid")
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
