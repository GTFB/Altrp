import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class SetUsersUuidsUniqueAndNotnullable extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, async (table) => {
      table.uuid('guid').alter();
      table.dropNullable('guid');
      table.unique(['guid']);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('guid').alter();
      table.dropUnique(['guid']);
      table.setNullable('guid');
    });
  }
}
