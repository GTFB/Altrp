import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpNotifications extends BaseSchema {
  protected tableName = 'altrp_notifications'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('notice_name')
      table.string('type')
      table.string('setting_name')
      table.string('action_type')
      table.string('notifiable_type')
      table.bigInteger('notifiable_id').unsigned()
      table.text('data', 'longtext')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('read_at ', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
