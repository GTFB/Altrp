import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorModel extends BaseCommand {
  public static commandName = 'generator:model'

  public static description = 'Run a model generator'
  
  @args.string({ name: 'id', description: 'Id of the model' })
  public id: string

  @flags.boolean({
    name: 'delete',
    alias: 'd',
    description: 'Delete generated model'
  })
  public isDelete: boolean

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Model } = await import('App/Models/Model')
    const { default: ModelGenerator } = await import('App/Generators/ModelGenerator')

    const model = await Model.find(parseInt(this.id))

    if (model) {
      const modelGenerator = new ModelGenerator()

      if (this.isDelete) {
        modelGenerator.deleteFiles(model)
        this.logger.success(`Model of id (${this.id}) deleted: ${this.colors.cyan(modelGenerator.getFilename(model))}`)
      } else {
        await modelGenerator.run(model)
        this.logger.success(`Model generated for id (${this.id}) : ${this.colors.cyan(modelGenerator.getFilename(model))}`)
      }
    }
  }
}
