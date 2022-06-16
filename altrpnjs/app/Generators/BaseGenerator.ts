import View from '@ioc:Adonis/Core/View'
import * as mustache from 'mustache'
import fs from 'fs'
import Application from "@ioc:Adonis/Core/Application";
import path from "path";
import isProd from "../../helpers/isProd";
import {CacheManager} from "edge.js/build/src/CacheManager";
import env from "../../helpers/env";
import clearRequireCache from "../../helpers/node-js/clearRequireCache";
import applyPluginsFiltersAsync from "../../helpers/plugins/applyPluginsFiltersAsync";

export abstract class BaseGenerator{
  private fileName: string;
  protected directory: string;
  private stubFilePath: string;

  protected addFile(fileName: string):this {
    this.fileName = fileName
    return this
  }

  protected destinationDir(directory:string):this{
    this.directory = directory
    return this
  }

  protected stub(stubFilePath:string):this{
    this.stubFilePath = stubFilePath
    return this
  }

  protected async apply(vars: object){
    let content: string = ''

    if(fs.existsSync(this.stubFilePath)){
      content = fs.readFileSync(this.stubFilePath, {encoding: 'utf8'})
    }

    content = mustache.render(content, vars)
    if(! fs.existsSync(this.directory)){
      fs.mkdirSync(this.directory, {recursive:true})
    }
    content = await applyPluginsFiltersAsync('generate_file', content, this)
    fs.writeFileSync(this.getFullFileName(), content)
    if(isProd()){
      /**
       * clear all view cached pages
       */
      View.asyncCompiler.cacheManager = new CacheManager(env('CACHE_VIEWS'))
      clearRequireCache()
    }
    return
  }

  protected async applyFilters(type: string, content): Promise<any> {
    return await applyPluginsFiltersAsync(type, content)
  }

  private getFullFileName():string{
    return path.join(this.directory,this.fileName)
  }

  static async generateCssFile(fileName:string, content:string):Promise<void >{
    if(fileName.indexOf('.css') !== fileName.length - 4){
      fileName += '.css'
    }
    fileName = Application.publicPath(`altrp/css/${fileName}`)
    content = mustache.render(content,{})

    if(! fs.existsSync(Application.publicPath(`altrp/css/`))){
      fs.mkdirSync(Application.publicPath(`altrp/css/`), {recursive:true})
    }
    fs.writeFileSync(fileName, content)
    return
  }
}
