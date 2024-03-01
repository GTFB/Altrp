import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_columns'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.json('data').after('model_id')

    })
  }

  public async down () {

    this.schema.table(this.tableName, (table) => {
      table.dropColumn('data')

    })  }
}
