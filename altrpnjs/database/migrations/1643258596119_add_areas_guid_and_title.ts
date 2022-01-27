import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Area from "App/Models/Area";
import { v4 as uuid } from "uuid";

export default class AddAreasGuidAndTitle extends BaseSchema {
  protected tableName = 'areas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid("guid")
      table.string("title")
    })

    this.defer(async (db) => {
      //@ts-ignore
      const areas = await Area.query().where("guid", null);

      areas.forEach((area) => {
        area.guid = uuid()
        area.title = area.name.charAt(0).toUpperCase() + area.name.slice(1);
        area.save()
      })

      return db.table(this.tableName)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("guid")
      table.dropColumn("title")
    })
  }
}
