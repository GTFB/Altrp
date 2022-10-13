import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorController extends BaseCommand {
  public static commandName = 'generator:controller'

  public static description = 'Run a controller generator'

  @flags.array({
    name: 'id',
    alias: 'i',
    description: 'Array of controller ids (comma separated values without space)',
  })
  public id: string[]

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Controller } = await import('App/Models/Controller')
    const { default: ControllerGenerator } = await import('App/Generators/ControllerGenerator')

    let controllers

    if (this.id) {
      controllers = await Controller.query()
        .whereNull('deleted_at')
        .andWhereIn('id', this.id)
        .limit(this.id.length)
        .select('*')
    } else {
      controllers = await Controller.query()
        .whereNull('deleted_at')
        .select('*')
    }

    const controllerGenerator = new ControllerGenerator()
    const failure: Error[] = []

    for (let controller of controllers) {
      try {
        await controllerGenerator.run(controller)
        console.log(`Controller generated for id (${this.id}): ${this.colors.cyan(controllerGenerator.getFilename())}`)
      } catch (err) {
        console.error(`Error occurred while generating Controller ${controller.guid}: ${err.message}`)
        console.error(err)
        failure.push(err)
      }
    }

    if (failure.length) {
      console.error(`${failure.length} error${failure.length === 1 ? '' : 's'} occurred while generating controllers`)
    }
  }
}
