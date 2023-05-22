import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleUsers extends BaseSchema {
  protected tableName = 'role_user'

  public async up () {
    if (await this.schema.hasTable(this.tableName)) {
      return
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('user_id').unsigned()
      table.bigInteger('role_id').unsigned()
      table.string('user_type').defaultTo('App\\User').nullable()


      table.foreign('user_id').references('users.id').onDelete('cascade');
      table.foreign('role_id').references('roles.id').onDelete('cascade');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
