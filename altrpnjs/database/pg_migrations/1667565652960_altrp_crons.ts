import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpCrons extends BaseSchema {
  protected tableName = 'altrp_crons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('customizer_id').unsigned()
      table.timestamp('start_at', { useTz: true })
      table.timestamp('last_run', { useTz: true })
      table.timestamp('next_run', { useTz: true })
      table.bigInteger('remain_count')
      table.string('recurrence', 255).notNullable()
      table.text('log').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.foreign('customizer_id').references('altrp_customizers.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
