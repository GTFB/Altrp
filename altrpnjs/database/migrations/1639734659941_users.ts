import BaseSchema from '@ioc:Adonis/Lucid/Schema'

//2014_10_12_000000_create_users_table.php
export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    if(! await this.schema.hasTable(this.tableName)){
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements('id').primary()
        table.string('email', 255).notNullable().unique()
        table.string('password', 180).notNullable()
        table.timestamp("email_verified_at").nullable()
        table.string('remember_me_token').nullable()

        /**
         * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', { useTz: true }).notNullable()
        table.timestamp('updated_at', { useTz: true }).notNullable()
      })

    }
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
