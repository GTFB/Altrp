import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorSchedule extends BaseCommand {
  public static commandName = 'generator:schedule'

  public static description = 'Run a schedule generator'
  
  @args.string({ name: 'id', description: 'Id of the schedule customizer' })
  public id: string

  @flags.boolean({
    name: 'delete',
    alias: 'd',
    description: 'Delete generated schedule'
  })
  public isDelete: boolean

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Customizer } = await import('App/Models/Customizer')
    const { default: CustomizerGenerator } = await import('App/Generators/CustomizerGenerator')

    const customizer = await Customizer.find(parseInt(this.id))

    if (customizer && customizer.type === 'schedule') {
      const customizerGenerator = new CustomizerGenerator(customizer)

      if (this.isDelete) {
        customizerGenerator.delete()
        console.log(`Schedule of id (${this.id}) deleted: ${this.colors.cyan(customizerGenerator.getFileName())}`)
      } else {
        await customizerGenerator.run()
        console.log(`Schedule generated for id (${this.id}) : ${this.colors.cyan(customizerGenerator.getFileName())}`)
      }
    }
  }
}
