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
      return console.error(new Error(`Customizer of id ${id} does not exist`))
    }

    console.log(`Found customizer of id ${id}: ${this.colors.cyan(customizer.name)}`)

    const generator = new ScheduleGenerator(customizer)
    const filePath = generator.getFilePath()

    const { default: classCustomizerSchedule } = require(filePath)

    if (classCustomizerSchedule) {
      const customizerSchedule = new classCustomizerSchedule

      await customizerSchedule.run()
    }
  }
}
