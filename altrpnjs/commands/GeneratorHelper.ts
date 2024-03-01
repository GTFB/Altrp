import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorHelper extends BaseCommand {
  public static commandName = 'generator:helper'

  public static description = 'Run a helper generator'

  @flags.array({
    name: 'id',
    alias: 'i',
    description: 'Array of helper ids (comma separated values without space)',
  })
  public id: string[]

  @flags.boolean({
    name: 'delete',
    alias: 'd',
    description: 'Delete generated helper'
  })
  public isDelete: boolean

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Customizer } = await import('App/Models/Customizer')
    const { default: HelperGenerator } = await import('App/Generators/HelperGenerator')

    let helpers

    if (this.id) {
      helpers = await Customizer.query()
        .where('type', 'helper')
        .andWhereIn('id', this.id)
        .limit(this.id.length)
        .select('*')
    } else {
      helpers = await Customizer.query()
        .where('type', 'helper')
        .select('*')
    }

    const failure: Error[] = []

    for (let helper of helpers) {
      const helperGenerator = new HelperGenerator(helper)

      try {
        if (this.isDelete) {
          helperGenerator.delete()
          console.log(`Helper of id (${helper.id}) deleted: ${this.colors.cyan(helperGenerator.getFileName())}`)
        } else {
          await helperGenerator.run()

        }
      } catch (err) {
        console.error(`Error occurred while generating Helper ${helper.guid}: ${err.message}`)
        console.error(err)
        failure.push(err)
      }
    }

    if (failure.length) {
      console.error(`${failure.length} error${failure.length === 1 ? '' : 's'} occurred while generating helpers`)
    }
  }
}
