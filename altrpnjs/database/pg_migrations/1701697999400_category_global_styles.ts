import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'altrp_global_template_styles'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('category_guid', 36).after('id')
      table.foreign('category_guid').references('guid').inTable('altrp_categories')
        .onDelete('set null').onUpdate('cascade')

    })
  }

  public async down () {
    this.schema.table(this.tableName, (table)=>{
      table.dropColumn('category_guid')

    })
  }
}
