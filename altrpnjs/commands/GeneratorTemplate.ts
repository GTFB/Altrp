import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'

export default class GeneratorTemplate extends BaseCommand {
  public static commandName = 'generator:template'

  public static description = 'Run a template generator'
  
  @args.string({ name: 'id', description: 'Id of the template' })
  public id: string

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

    const template = await Template.find(parseInt(this.id))

    if (template) {
      const templateGenerator = new TemplateGenerator()

      if (this.isDelete) {
        templateGenerator.deleteFile(template)
        templateGenerator.deleteFiles(template)
        this.logger.success(`Template of id (${this.id}) deleted: ${this.colors.cyan(templateGenerator.getFilename(template))}`)
      } else {
        await templateGenerator.run(template)
        this.logger.success(`Template generated for id (${this.id}) : ${this.colors.cyan(templateGenerator.getFilename(template))}`)
      }
    }
  }
}
