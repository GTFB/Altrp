import { BaseCommand, args } from '@adonisjs/core/build/standalone'
import ScheduleGenerator from 'App/Generators/ScheduleGenerator';

export default class CustomizerSchedule extends BaseCommand {
  public static commandName = 'customizer:schedule'

  public static description = 'Run a Schedule customizer'

  @args.string({ name: 'id', description: 'Id of the customizer' })
  public id: string

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Customizer } = await import('App/Models/Customizer')
    const id = this.id

    const customizer = await Customizer.find(id)

    if (!customizer || customizer.type !== 'schedule') {
      return this.logger.error(new Error(`Customizer of id ${id} does not exist`))
    }

    this.logger.success(`Found customizer of id ${id}: ${this.colors.cyan(customizer.name)}`)

    const generator = new ScheduleGenerator(customizer)
    const filePath = generator.getFilePath()

    const { default: classCustomizerCRUD } = await import(filePath)

    if (classCustomizerCRUD) {
      const customizerCRUD = new classCustomizerCRUD

      customizerCRUD.run()
    }
  }
}
