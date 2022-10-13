import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorTemplate extends BaseCommand {
  public static commandName = 'generator:template'

  public static description = 'Run a template generator'

  @flags.array({
    name: 'id',
    alias: 'i',
    description: 'Array of template ids (comma separated values without space)',
  })
  public id: string[]

  @flags.boolean({
    name: 'delete',
    alias: 'd',
    description: 'Delete generated template'
  })
  public isDelete: boolean

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Template } = await import('App/Models/Template')
    const { default: TemplateGenerator } = await import('App/Generators/TemplateGenerator')

    let templates

    if (this.id) {
      templates = await Template.query()
        .whereNull('deleted_at')
        .andWhereIn('id', this.id)
        .limit(this.id.length)
        .select('*')
    } else {
      templates = await Template.query()
        .whereNull('deleted_at')
        .select('*')
    }

    const templateGenerator = new TemplateGenerator()
    const failure: Error[] = []

    for (let template of templates) {
      try {
        if (this.isDelete) {
          templateGenerator.deleteFile(template)
          templateGenerator.deleteFiles(template)
          console.log(`Template of id (${this.id}) deleted: ${this.colors.cyan(templateGenerator.getFilename(template))}`)
        } else {
          await templateGenerator.run(template)
          console.log(`Template generated for id (${this.id}): ${this.colors.cyan(templateGenerator.getFilename(template))}`)
        }
      } catch (err) {
        console.error(`Error occurred while ${this.isDelete ? 'deleting' : 'generating'} Template ${template.guid}: ${err.message}`)
        console.error(err)
        failure.push(err)
      }
    }

    if (failure.length) {
      console.error(`${failure.length} error${failure.length === 1 ? '' : 's'} occurred while ${this.isDelete ? 'deleting' : 'generating'} templates`)
    }
  }
}
