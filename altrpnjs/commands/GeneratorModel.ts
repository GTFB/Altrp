import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorModel extends BaseCommand {
  public static commandName = 'generator:model'

  public static description = 'Run a model generator'

  @flags.array({
    name: 'id',
    alias: 'i',
    description: 'Array of model ids (comma separated values without space)',
  })
  public id: string[]

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

    let models

    if (this.id) {
      models = await Model.query()
        .whereNull('deleted_at')
        .andWhereIn('id', this.id)
        .limit(this.id.length)
        .select('*')
    } else {
      models = await Model.query()
        .whereNull('deleted_at')
        .select('*')
    }

    const modelGenerator = new ModelGenerator()
    const failure: Error[] = []

    for (let model of models) {
      try {
        if (this.isDelete) {
          modelGenerator.deleteFiles(model)
          console.log(`Model of id (${model.id}) deleted: ${this.colors.cyan(modelGenerator.getFilename(model))}`)
        } else {
          await modelGenerator.run(model)
          console.log(`Model generated for id (${model.id}): ${this.colors.cyan(modelGenerator.getFilename(model))}`)
        }
      } catch (err) {
        console.error(`Error occurred while ${this.isDelete ? 'deleting' : 'generating'} Model ${model.guid}: ${err.message}`)
        console.error(err)
        failure.push(err)
      }
    }

    if (failure.length) {
      console.error(`${failure.length} error${failure.length === 1 ? '' : 's'} occurred while ${this.isDelete ? 'deleting' : 'generating'} models`)
    }
  }
}
