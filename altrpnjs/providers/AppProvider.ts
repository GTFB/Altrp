import { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready

    const AltrpHashDriver = (await import('App/Providers/AltrpHashDriver')).default;

    const Hash = this.app.container.use('Adonis/Core/Hash');
    Hash.extend('altrpHasher', () => {
      return new AltrpHashDriver();
    });
  }

  public async ready() {
    // App is ready
    if (this.app.environment === 'web') {
      await import('../start/socket');
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
