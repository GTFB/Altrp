import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorPage extends BaseCommand {
  public static commandName = 'generator:page'

  public static description = 'Run a page generator'

  @flags.array({
    name: 'id',
    alias: 'i',
    description: 'Array of page ids (comma separated values without space)',
  })
  public id: string[]

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Page } = await import('App/Models/Page')
    const { default: PageGenerator } = await import('App/Generators/PageGenerator')

    let pages

    if (this.id) {
      pages = await Page.query()
        .whereNull('deleted_at')
        .andWhereIn('id', this.id)
        .limit(this.id.length)
        .select('*')
    } else {
      pages = await Page.query()
        .whereNull('deleted_at')
        .select('*')
    }

    const pageGenerator = new PageGenerator()
    const failure: Error[] = []

    for (let page of pages) {
      try {
        const result = await pageGenerator.run(page)

        if (result) {
          console.log(`Page generated for id (${page.id}): ${this.colors.cyan(pageGenerator.getFilename(page))}`)
        } else {
          throw new Error(`Page (id: ${page.id}) is invalid`)
        }
      } catch (err) {
        console.error(`Error occurred while generating Page ${page.guid}: ${err.message}`)
        console.error(err)
        failure.push(err)
      }
    }

    if (failure.length) {
      console.error(`${failure.length} error${failure.length === 1 ? '' : 's'} occurred while generating with pages`)
    }
  }
}
