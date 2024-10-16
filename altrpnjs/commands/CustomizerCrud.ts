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
    // const table = this.ui.table()
    const action = ['create', 'read', 'update', 'delete'].includes(this.action)
      ? this.action
      : 'create'
    // const modelName = this.modelName
    const hookType = this.isBefore ? 'before': 'after'
    const instanceId = this.instanceId

    // table.head(['Name', 'Argument', 'Composed'])
    // table.columnWidths([15, 30, 30])
    // table.row(['Model', this.modelName, modelName])
    // table.row(['Action', this.action, action])
    // table.row(['Hook', this.isBefore ? '--before' : '', hookType])
    // table.row(['Instance', this.instanceId, instanceId])
    // table.render()

    let customizers = await Customizer.query()
      .preload('altrp_model', modelQuery => {
        modelQuery.where('name', this.modelName)
      })
      .where('type', 'crud')

    customizers = customizers.filter(
      customizer => customizer.settings.event_type === action
        && customizer.settings.event_hook_type === hookType
    )
    customizers.forEach(customizer =>{
      if (!customizer) {
        return
      }

      console.log(`Found customizer for ${this.modelName} ${hookType} ${action}: ${this.colors.cyan(customizer.name)}`)

      const generator = new CustomizerGenerator(customizer)
      const filePath = generator.getFilePath()

       import(filePath).then(module=>{
         const { default: classCustomizerCRUD } = module
        if (classCustomizerCRUD) {
          const customizerCRUD = new classCustomizerCRUD

          customizerCRUD.run(instanceId)
        }
      })


    })
  }
}
