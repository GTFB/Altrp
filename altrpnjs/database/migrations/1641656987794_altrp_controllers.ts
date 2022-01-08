import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpControllers extends BaseSchema {
  protected tableName = 'altrp_controllers'

  public async up () {
    if(! await this.schema.hasTable(this.tableName)) {

      this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.integer('model_id').unsigned().nullable()
        table.string('namespace').nullable()
        table.string('prefix').nullable()
        table.string('relations').nullable()
        table.text('description').nullable()
        table.text('validations').nullable()

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', {useTz: true})
        table.timestamp('updated_at', {useTz: true})

        table.foreign('model_id').references('altrp_models.id')

      })
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
