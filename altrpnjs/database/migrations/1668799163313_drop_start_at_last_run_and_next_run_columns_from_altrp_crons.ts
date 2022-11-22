import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropStartAtLastRunAndNextRunColumnsFromAltrpCrons extends BaseSchema {
  protected tableName = 'altrp_crons'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('start_at')
      table.dropColumn('last_run')
      table.dropColumn('next_run')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.timestamp('start_at', { useTz: true })
      table.timestamp('last_run', { useTz: true })
      table.timestamp('next_run', { useTz: true })
    })
  }
}
