import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorListener extends BaseCommand {
  public static commandName = 'generator:listener'

  public static description = 'Run a listener generator'

  @flags.array({
    name: 'id',
    alias: 'i',
    description: 'Array of listener ids (comma separated values without space)',
  })
  public id: string[]

  @flags.boolean({
    name: 'delete',
    alias: 'd',
    description: 'Delete generated listener'
  })
  public isDelete: boolean

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Customizer } = await import('App/Models/Customizer')
    const { default: ListenerGenerator } = await import('App/Generators/ListenerGenerator')

    let listeners

    if (this.id) {
      listeners = await Customizer.query()
        .where('type', 'listener')
        .andWhereIn('id', this.id)
        .limit(this.id.length)
        .select('*')
    } else {
      listeners = await Customizer.query()
        .where('type', 'listener')
        .select('*')
    }

    const listenerGenerator = new ListenerGenerator()
    const failure: Error[] = []

    for (let listener of listeners) {
      try {
        if (this.isDelete) {
          listenerGenerator.delete(listener)
          console.log(`Listener of id (${this.id}) deleted: ${this.colors.cyan(listener.name)}`)
        } else {
          await listenerGenerator.run(listener)
          console.log(`Listener generated for id (${this.id}): ${this.colors.cyan(listener.name)}`)
        }
      } catch (err) {
        console.error(`Error occurred while generating Listener ${listener.guid}: ${err.message}`)
        console.error(err)
        failure.push(err)
      }
    }

    if (failure.length) {
      console.error(`${failure.length} error${failure.length === 1 ? '' : 's'} occurred while generating listeners`)
    }
  }
}
