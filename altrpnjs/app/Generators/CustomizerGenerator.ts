import BaseGenerator from './BaseGenerator'
import appPath from '../../helpers/path/app_path'
import isProd from '../../helpers/isProd'
import fs from 'fs'
import path from 'path'
import Customizer from 'App/Models/Customizer'
import clearRequireCache from '../../helpers/node-js/clearRequireCache'

export default class CustomizerGenerator extends BaseGenerator {
  public static directory = appPath('/AltrpCRUDs/')

  private static template = appPath(`/altrp-templates/${isProd() ? 'prod' : 'dev'}/AltrpCRUD.stub`)

  public static ext = isProd() ? '.js': '.ts'

  private customizer: Customizer

  constructor(customizer: Customizer) {
    super()

    this.customizer = customizer
  }

  getFileName(): string {
    const fileName = this.customizer.name + CustomizerGenerator.ext

    return fileName
  }

  getFilePath(): string {
    const fileName = this.getFileName()

    return path.join(CustomizerGenerator.directory, fileName)
  }

  public deleteFiles() {
    const filePath = this.getFilePath()
    const directoryPath = CustomizerGenerator.directory

    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath)
    }

    const isDirectory = fs.lstatSync(directoryPath).isDirectory()
    const isEmpty = isDirectory && !fs.readdirSync(directoryPath).length

    if (isEmpty) {
      fs.rmdirSync(directoryPath)
    }
  }

  public async run() {
    const customizer = this.customizer

    if (!customizer || !customizer.type || !customizer.settings) {
      return
    }

    if (!customizer.settings.event_type || !customizer.settings.event_hook_type) {
      return
    }

    let imports = ''
    let content = customizer.getMethodContent()

    content = await this.applyFilters('templates', content)
    imports = await this.applyFilters('imports', imports)

    const fileName = this.getFileName()
    const directoryPath = CustomizerGenerator.directory

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }

    await this.addFile(fileName)
      .destinationDir(directoryPath)
      .stub(CustomizerGenerator.template)
      .apply({
        name: customizer.name,
        imports,
        content
      })

    clearRequireCache()
  }

  public delete() {
    if(!this.customizer) {
      return
    }

    this.deleteFiles()
  }
}
