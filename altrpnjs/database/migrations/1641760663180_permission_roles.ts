import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class PermissionRoles extends BaseSchema {
  protected tableName = 'permission_role';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.bigInteger('permission_id').unsigned();
      table.bigInteger('role_id').unsigned();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });

      table.foreign('role_id').references('roles.id');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
