import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpAccessors extends BaseSchema {
  protected tableName = 'altrp_accessors'

  public async up () {
    if(! await this.schema.hasTable(this.tableName)) {

      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id')
        table.string('name')
        table.string('title')
        table.text('calculation')
        table.text('calculation_logic')
        table.text('description')
        table.bigInteger('model_id').unsigned()
        table.bigInteger('user_id').unsigned()
        table.boolean('status')
        table.text('test', 'longtext')

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', {useTz: true})
        table.timestamp('updated_at', {useTz: true})

        table.foreign('user_id').references('users.id')
        table.foreign('model_id').references('altrp_models.id')
      })

    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
