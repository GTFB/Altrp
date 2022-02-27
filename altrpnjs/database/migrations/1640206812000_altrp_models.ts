import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpModels extends BaseSchema {
  protected tableName = 'altrp_models'

  public async up () {
    if(! await this.schema.hasTable(this.tableName)) {

      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id')
        table.string('name').unique()
        table.string('title').nullable()
        table.string('namespace').nullable()
        table.string('fillable_cols').nullable()
        table.string('user_cols').nullable()
        table.string('path').nullable()
        table.string('guid', 36).nullable()
        table.string('bounded_model').nullable()
        table.string('pk').defaultTo('id')
        table.text('description').nullable()
        table.boolean('soft_deletes')
        table.boolean('preset')
        table.boolean('time_stamps')
        table.bigInteger('parent_model_id').unsigned().nullable()
        table.bigInteger('user_id').unsigned().nullable()
        table.bigInteger('table_id').unsigned().nullable()

        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', {useTz: true})
        table.timestamp('updated_at', {useTz: true})
        table.timestamp('last_upgrade', {useTz: true})

        table.foreign('user_id').references('users.id')

      })
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
