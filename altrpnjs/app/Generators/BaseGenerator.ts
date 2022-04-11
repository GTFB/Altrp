import View from '@ioc:Adonis/Core/View'
import * as mustache from 'mustache'
import fs from 'fs'
import Application from "@ioc:Adonis/Core/Application";
import path from "path";
import isProd from "../../helpers/isProd";
import {CacheManager} from "edge.js/build/src/CacheManager";
import env from "../../helpers/env";
import app_path from "../../helpers/app_path";
import Plugin from "App/Plugin"
import Logger from "@ioc:Adonis/Core/Logger";

export abstract class BaseGenerator {
  private fileName: string;
  protected directory: string;
  private stubFilePath: string;

  protected addFile(fileName: string): this {
    this.fileName = fileName
    return this
  }

  protected destinationDir(directory: string): this {
    this.directory = directory
    return this
  }

  protected stub(stubFilePath: string): this {
    this.stubFilePath = stubFilePath
    return this
  }

  protected async apply(vars: object) {
    let content: string = ''

    if (fs.existsSync(this.stubFilePath)) {
      content = fs.readFileSync(this.stubFilePath, {encoding: 'utf8'})
    }

    content = mustache.render(content, vars)
    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory, {recursive: true})
    }
    fs.writeFileSync(this.getFullFileName(), content)
    if (isProd()) {
      View.asyncCompiler.cacheManager = new CacheManager(env('CACHE_VIEWS'))
      Object.keys(require.cache).forEach(function (key) {
        delete require.cache[key]
      })
    }
    return
  }

  protected async applyFilters(type: string, content): Promise<any> {

    const plugins = await Plugin.getEnabledPlugins()

    for (const plugin of plugins) {
      const hasHooks = fs.existsSync(app_path(`AltrpPlugins/${plugin.name}/hooks`))

      if (hasHooks) {
        const hasType = fs.existsSync(app_path(`AltrpPlugins/${plugin.name}/hooks/${type}`));

        if (hasType) {
          const hooks = fs.readdirSync(app_path(`AltrpPlugins/${plugin.name}/hooks/${type}`))

          for (const hookName of hooks) {
            const filePath = app_path(`AltrpPlugins/${plugin.name}/hooks/${type}/${hookName}`)
            try{
              const hook = isProd() ? (await require(filePath)).default
                : (await import(filePath)).default
              content = await hook(content)
            }catch (e){
              Logger.error(e)
            }

          }
        }
      }
    }


    return content
  }

  private getFullFileName(): string {
    return path.join(this.directory, this.fileName)
  }

  static async generateCssFile(fileName: string, content: string): Promise<void> {
    if (fileName.indexOf('.css') !== fileName.length - 4) {
      fileName += '.css'
    }
    fileName = Application.publicPath(`altrp/css/${fileName}`)
    if (!fs.existsSync(Application.publicPath(`altrp/css/`))) {
      fs.mkdirSync(Application.publicPath(`altrp/css/`), {recursive: true})
    }
    fs.writeFileSync(fileName, content)
    return
  }
}
