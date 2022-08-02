import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import User from 'App/Models/User';
import { v4 as uuid } from 'uuid';

export default class AddUniqueUserIds extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    if (!(await this.schema.hasColumn(this.tableName, 'guid'))) {
      this.schema.alterTable(this.tableName, async (table) => {
        table.uuid('guid').nullable();
        table.unique(['guid']);

        this.defer(async () => {
          //@ts-ignore
          const users = await User.query().where('guid', null);

          for (const user of users) {
            user.guid = uuid();
            await user.save();
          }
        });
      });
    }
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('guid');
    });
  }
}
