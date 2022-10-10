import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorListener extends BaseCommand {
  public static commandName = 'generator:listener'

  public static description = 'Run a listener generator'
  
  @args.string({ name: 'id', description: 'Id of the listener' })
  public id: string

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

    const customizer = await Customizer.find(parseInt(this.id))

    if(customizer) {
      const listenerGenerator = new ListenerGenerator()

      if (this.isDelete) {
        listenerGenerator.delete(customizer)
        this.logger.success(`Listener of id (${this.id}) deleted: ${this.colors.cyan(listenerGenerator.getFilename())}`)
      } else {
        await listenerGenerator.run(customizer)
        this.logger.success(`Listener generated for id (${this.id}) : ${this.colors.cyan(listenerGenerator.getFilename())}`)
      }
    }
  }
}
