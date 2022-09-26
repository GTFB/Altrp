import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'
import CustomizerGenerator from 'App/Generators/CustomizerGenerator';

export default class CustomizerCrud extends BaseCommand {
  public static commandName = 'customizer:crud'

  public static description = 'Run a CRUD customizer'

  @args.string({ name: 'model', description: 'Name of the model' })
  public modelName: string

  @args.string({
    description: 'Action type that should be hooked [create(default), read, update, delete]', 
    required: false
  })
  public action: string

  @flags.boolean({
    name: 'before',
    alias: 'b',
    description: 'Trigger the hook before the model action'
  })
  public isBefore: boolean

  @args.string({ name: 'id', description: 'Id of the instance', required: false })
  public instanceId: string

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: Customizer } = await import('App/Models/Customizer')
    const table = this.ui.table()
    const action = ['create', 'read', 'update', 'delete'].includes(this.action)
      ? this.action
      : 'create'
    const modelName = this.modelName
    const hookType = this.isBefore ? 'before': 'after'
    const instanceId = this.instanceId

    table.head(['Name', 'Argument', 'Composed'])
    table.columnWidths([15, 30, 30])
    table.row(['Model', this.modelName, modelName])
    table.row(['Action', this.action, action])
    table.row(['Hook', this.isBefore ? '--before' : '', hookType])
    table.row(['Instance', this.instanceId, instanceId])
    table.render()

    const customizers = await Customizer.query()
      .preload('altrp_model', modelQuery => {
        modelQuery.where('name', this.modelName)
      })
      .where('type', 'crud')

    const customizer = customizers.find(customizer => customizer.settings.event_type === action)

    if (!customizer) {
      return this.logger.error(new Error('Customizer does not exist'))
    }

    this.logger.success(`Found customizer: ${this.colors.cyan(customizer.name)}`)

    const generator = new CustomizerGenerator(customizer)
    const filePath = generator.getFilePath()

    const classCustomizerCRUD = await import(filePath)

    if (classCustomizerCRUD) {
      const customizerCRUD = new classCustomizerCRUD

      customizerCRUD.run(instanceId)
    }
  }
}
