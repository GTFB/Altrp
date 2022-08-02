import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AddUserTelegramChats extends BaseSchema {
  protected tableName = 'users';
  public async up() {
    if (await this.schema.hasColumn(this.tableName, 'telegram_chat')) {
      return;
    }
    await this.schema.table(this.tableName, (table) => {
      table.bigInteger('telegram_chat').nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('telegram_chat');
    });
  }
}
