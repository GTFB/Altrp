import { BaseCommand, args } from '@adonisjs/core/build/standalone'

export default class GeneratorPage extends BaseCommand {
  public static commandName = 'generator:page'

  public static description = 'Run a page generator'
  
  @args.string({ name: 'id', description: 'Id of the page' })
  public id: string

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Page } = await import('App/Models/Page')
    const { default: PageGenerator } = await import('App/Generators/PageGenerator')

    const page = await Page.find(parseInt(this.id))

    if (page) {
      const pageGenerator = new PageGenerator()
      await pageGenerator.run(page)
      console.log(`Page generated for id:${this.id}: ${this.colors.cyan(pageGenerator.getFilename(page))}`)
    }
  }
}
