import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorSchedule extends BaseCommand {
  public static commandName = 'generator:crud'

  public static description = 'Run a CRUD generator'

  @flags.array({
    name: 'id',
    alias: 'i',
    description: 'Array of CRUD ids (comma separated values without space)',
  })
  public id: string[]

  @flags.boolean({
    name: 'delete',
    alias: 'd',
    description: 'Delete generated CRUD'
  })
  public isDelete: boolean

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Customizer } = await import('App/Models/Customizer')
    const { default: CustomizerGenerator } = await import('App/Generators/CustomizerGenerator')

    let cruds

    if (this.id) {
      cruds = await Customizer.query()
        .where('type', 'crud')
        .andWhereIn('id', this.id)
        .limit(this.id.length)
        .select('*')
    } else {
      cruds = await Customizer.query()
        .where('type', 'crud')
        .select('*')
    }

    const failure: Error[] = []

    for (let crud of cruds) {
      const crudGenerator = new CustomizerGenerator(crud)

      try {
        if (this.isDelete) {
          crudGenerator.delete()
          console.log(`CRUD of id (${this.id}) deleted: ${this.colors.cyan(crudGenerator.getFileName())}`)
        } else {
          await crudGenerator.run()
          console.log(`CRUD generated for id (${this.id}): ${this.colors.cyan(crudGenerator.getFileName())}`)
        }
      } catch (err) {
        console.error(`Error occurred while generating CRUD ${crud.guid}: ${err.message}`)
        console.error(err)
        failure.push(err)
      }
    }

    if (failure.length) {
      console.error(`${failure.length} error${failure.length === 1 ? '' : 's'} occurred while generating CRUDs`)
    }
  }
}
