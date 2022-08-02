import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';
import Role from 'App/Models/Role';
export default class AdminSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    let name = process.argv.find((item) => item.indexOf('name=') === 0)?.replace('name=', '');
    let email = process.argv.find((item) => item.indexOf('email=') === 0)?.replace('email=', '');
    let password = process.argv
      .find((item) => item.indexOf('password=') === 0)
      ?.replace('password=', '');
    let message = '';
    if (!name) {
      message += 'Please enter a name\n';
    }
    if (!password) {
      message += 'Please enter a password\n';
    }
    if (password && password.length < 8) {
      message += 'A password must be at least 8 characters\n';
    }
    if (!email) {
      message += 'Please enter a email\n';
    }
    if (message) {
      console.error(`Error: \n${message}`);
      return;
    }
    let user = await User.create({
      email,
      name,
      password,
    });
    try {
      let role = await Role.firstOrCreate({
        name: 'admin',
        display_name: 'Admin',
      });
      await user.related('roles').attach({
        [role.id]: {
          user_type: 'App\\User',
        },
      });
    } catch (e) {
      await user.delete();
      throw e;
    }
  }
}
