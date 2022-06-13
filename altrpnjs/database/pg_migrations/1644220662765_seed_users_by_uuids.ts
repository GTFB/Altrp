import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from "App/Models/User";
import { v4 as uuid } from "uuid";

export default class SeedUsersByUuuids extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.defer(async () => {
      //@ts-ignore
      let users = await User.query().whereNull("guid")

      for (let user of users) {
        user.guid = uuid();
        await user.save()
      }
    })
  }

  public async down () {
    //
  }
}
