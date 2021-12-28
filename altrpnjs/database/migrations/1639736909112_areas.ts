import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Area from "App/Models/Area";

//2020_06_02_145947_create_areas_table.php
export default class Areas extends BaseSchema {
  protected tableName = 'areas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string("name")
      table.string("settings")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      const areas = [
        {
          name: "content",
          settings: "[]"
        },
        {
          name: "header",
          settings: "[]"
        },
        {
          name: "footer",
          settings: "[]"
        },
        {
          name: "card",
          settings: "[]"
        },
        {
          name: "popup",
          settings: "[]"
        },
        {
          name: "reports",
          settings: "[]"
        },
        {
          name: "mails",
          settings: "[]"
        },
      ]

      areas.forEach((area) => {
        Area.create(area)
      })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
