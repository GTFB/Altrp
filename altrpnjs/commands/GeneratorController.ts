import { BaseCommand, args } from '@adonisjs/core/build/standalone'

export default class GeneratorController extends BaseCommand {
  public static commandName = 'generator:controller'

  public static description = 'Run a controller generator'
  
  @args.string({ name: 'id', description: 'Id of the controller' })
  public id: string

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Controller } = await import('App/Models/Controller')
    const { default: ControllerGenerator } = await import('App/Generators/ControllerGenerator')

    const controller = await Controller.find(parseInt(this.id))

    if (controller) {
      const controllerGenerator = new ControllerGenerator()
      await controllerGenerator.run(controller)
      this.logger.success(`Controller generated for id:${this.id}: ${this.colors.cyan(controllerGenerator.getFilename())}`)
    }
  }
}
