import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UpdateAltrpCustomizers extends BaseSchema {
  protected tableName = 'altrp_customizers';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.bigInteger('time');
      table.string('time_type');
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      //@ts-ignore
      table.dropColumns(['time', 'time_type']);
    });
  }
}
