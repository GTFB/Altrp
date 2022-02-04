import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Template from "App/Models/Template";

export default class UpdateTemplateGuids extends BaseSchema {
  protected tableName = 'templates'

  public async up () {
    const templates = await Template.all();

    for(const template of templates) {
      if(template.type === "review") {
        template.guid = null;
        await template.save()
      }
    }

    this.schema.alterTable(this.tableName, (table) => {
      table.unique(["guid"])
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      //@ts-ignore
      table.dropUnique("guid")
    })
  }
}
