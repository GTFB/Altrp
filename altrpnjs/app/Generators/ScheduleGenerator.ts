import fs from 'fs'
import path from 'path'
import Customizer from 'App/Models/Customizer'
import BaseGenerator from './BaseGenerator'
import appPath from '../../helpers/path/app_path'
import isProd from '../../helpers/isProd'
import clearRequireCache from '../../helpers/node-js/clearRequireCache'

export default class ScheduleGenerator extends BaseGenerator {
  public static directory = appPath('/AltrpSchedules/')

  private static template = appPath(`/altrp-templates/${isProd() ? 'prod' : 'dev'}/AltrpSchedule.stub`)

  public static ext = isProd() ? '.js': '.ts'

  private customizer: Customizer

  constructor(customizer: Customizer) {
    super()

    this.customizer = customizer
  }

  getFileName(): string {
    const fileName = this.customizer.name + ScheduleGenerator.ext

    return fileName
  }

  getFilePath(): string {
    const fileName = this.getFileName()

    return path.join(ScheduleGenerator.directory, fileName)
  }

  public deleteFiles() {
    const filePath = this.getFilePath()
    const directoryPath = ScheduleGenerator.directory

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
      console.error('Error [ScheduleGenerator]: customizer is not defined or its type or settings property is undefined')
      return false
    }

    let imports = this.getImportsContent()
    let content = customizer.getMethodContent()

    content = await this.applyFilters('templates', content)
    imports = await this.applyFilters('imports', imports)

    const fileName = this.getFileName()
    const directoryPath = ScheduleGenerator.directory

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }

    await this.addFile(fileName)
      .destinationDir(directoryPath)
      .stub(ScheduleGenerator.template)
      .apply({
        name: customizer.name,
        imports,
        content,
        params: 'instanceId'
      })

    clearRequireCache()

    return true
  }

  public delete() {
    if (!this.customizer) {
      return
    }

    this.deleteFiles()
  }

  private getImportsContent() {
    return isProd() ? this.getProdImportsContent() : this.getDevImportsContent()
  }

  private getProdImportsContent() {
    return `
const AltrpBaseController = require('../Controllers/AltrpBaseController').default
`
  }

  private getDevImportsContent() {
    return `
import AltrpBaseController from '../Controllers/AltrpBaseController'
`
  }
}
