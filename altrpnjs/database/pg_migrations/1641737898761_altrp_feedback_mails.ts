import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AltrpFeedbackMails extends BaseSchema {
  protected tableName = 'altrp_feedback_mails'

  public async up () {

    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name')
      table.string('email')
      table.string('status').defaultTo('delivered')
      table.text('subject')
      table.text('user_message', 'longtext')
      table.text('html', 'longtext')
      table.text('attachments', 'longtext')

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
