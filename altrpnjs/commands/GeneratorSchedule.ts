import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorSchedule extends BaseCommand {
  public static commandName = 'generator:schedule'

  public static description = 'Run a schedule generator'

  @flags.array({
    name: 'id',
    alias: 'i',
    description: 'Array of schedule ids (comma separated values without space)',
  })
  public id: string[]

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

    let schedules

    if (this.id) {
      schedules = await Customizer.query()
        .where('type', 'schedule')
        .andWhereIn('id', this.id)
        .limit(this.id.length)
        .select('*')
    } else {
      schedules = await Customizer.query()
        .where('type', 'schedule')
        .select('*')
    }

    const failure: Error[] = []

    for (let schedule of schedules) {
      const scheduleGenerator = new CustomizerGenerator(schedule)

      try {
        if (this.isDelete) {
          scheduleGenerator.delete()
          console.log(`Schedule of id (${schedule.id}) deleted: ${this.colors.cyan(scheduleGenerator.getFileName())}`)
        } else {
          const result = await scheduleGenerator.run()

          if (result) {
            console.log(`Schedule generated for id (${schedule.id}): ${this.colors.cyan(scheduleGenerator.getFileName())}`)
          } else {
            throw new Error(`Schedule Customizer (id: ${schedule.id}) is invalid`)
          }
        }
      } catch (err) {
        console.error(`Error occurred while generating Schedule ${schedule.guid}: ${err.message}`)
        console.error(err)
        failure.push(err)
      }
    }

    if (failure.length) {
      console.error(`${failure.length} error${failure.length === 1 ? '' : 's'} occurred while generating schedules`)
    }
  }
}
