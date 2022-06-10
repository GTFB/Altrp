import CleanCSS from 'clean-css';
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
import prepareContent from "../../helpers/prepareContent";
import {minify} from 'html-minifier'

class BaseGenerator {
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

  protected stub(stubFilePath:string,):this{
    this.stubFilePath = stubFilePath
    return this
  }

  protected async apply(vars: object,  prepare = false, htmlMinify = false){
    let content: string = ''

    if(fs.existsSync(this.stubFilePath)){
      content = fs.readFileSync(this.stubFilePath, {encoding: 'utf8'})
    }

    content = mustache.render(content, vars)
    if(prepare){
      content = await prepareContent(content)
    }
    if(! fs.existsSync(this.directory)){
      fs.mkdirSync(this.directory, {recursive:true})
    }
    if(htmlMinify){
      content = minify(content, {
        collapseWhitespace:true,
        minifyCSS: true,
      })
    }
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

  static async generateCssFile(fileName:string, content:string, screenName: string = ''):Promise<void >{
    if(fileName.indexOf('.css') !== fileName.length - 4){
      fileName += '.css'
    }
    if(screenName){
      screenName = `${screenName}/`
    }
    fileName = Application.publicPath(`altrp/css/${screenName}${fileName}`)

    if(! fs.existsSync(Application.publicPath(`altrp/css/${screenName}`))){
      fs.mkdirSync(Application.publicPath(`altrp/css/${screenName}`), {recursive:true})
    }
    let res = await new CleanCSS().minify(content)
    if(res.styles){
      content = res.styles
    }
    fs.writeFileSync(fileName, content)
    return
  }
}
export default BaseGenerator
