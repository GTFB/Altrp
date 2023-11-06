import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Area from "App/Models/Area";
import guid from "../../helpers/guid";

//2020_06_02_145947_create_areas_table.php
export default class Areas extends BaseSchema {
  protected tableName = 'areas'

  public async up () {
    if(! await this.schema.hasTable(this.tableName)) {
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id')

        table.string("name").unique()
        table.text("settings", 'longtext')
        table.string("title")
        table.string("guid", 36).nullable()
        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', {useTz: true})
        table.timestamp('updated_at', {useTz: true})

        const areas = [
          {
            name: "content",
            title: "Content",
            guid: guid(),
            settings: "[]"
          },
          {
            name: "header",
            title: "Header",
            guid: guid(),
            settings: "[]"
          },
          {
            name: "footer",
            title: "Footer",
            guid: guid(),
            settings: "[]"
          },
          {
            name: "card",
            title: "Card",
            guid: guid(),
            settings: "[]"
          },
          {
            name: "popup",
            title: "Popup",
            guid: guid(),
            settings: "[]"
          },
          {
            name: "mails",
            title: "Mails",
            guid: guid(),
            settings: "[]"
          },
        ]

        areas.forEach((area) => {
          Area.create(area)
        })
      })
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
