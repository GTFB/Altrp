import fs from 'fs'
import {BaseGenerator} from "./BaseGenerator";
import Application from "@ioc:Adonis/Core/Application";
import app_path from "../../helpers/path/app_path";
import Page from "App/Models/Page";
import SCREENS from "../../helpers/const/SCREENS";
import TemplateGenerator from "App/Generators/TemplateGenerator";
import JSONStringifyEscape from "../../helpers/string/JSONStringifyEscape";
import * as _ from "lodash";
import getLatestVersion from "../../helpers/getLatestVersion";
import Env from "@ioc:Adonis/Core/Env";
import env from "../../helpers/env";

export default class PageGenerator extends BaseGenerator {
  public __altrp_global__: {
    altrpSettings?: {
      action_components: string[],
      libsToLoad: string[],
      page_params: object,
      altrpMenus: any[]
    };
  } = {}

  setGlobal(path, value) {
    _.set(this.__altrp_global__, path, value)
  }

  getGlobal(path, _default: any = null): any {
    return _.get(this.__altrp_global__, path, _default)
  }
  public static directory = Application.resourcesPath('/views/altrp/pages')
  public static template = app_path(`altrp-templates/views/Page.stub`)
  public page: Page;


  async deleteFile(page: Page): Promise<void> {
    let fileName = this.getFilename(page)
    if (fs.existsSync(PageGenerator.directory + fileName)) {
      fs.rmSync(PageGenerator.directory + fileName);
    }
  }

  getFilename(page):string{
    return page.guid + '.edge'
  }

  async run(page: Page) {
    if(! page){
      return
    }


    if (!page.guid ) {
      console.error(`Page ${page.id} render error. Need more data`);
      return
    }
    this.page = page
    this.setGlobal('altrpSettings', {})
    const altrp_settings = await page.getPageSettings(this)
    const fonts = this.getFonts()
    const _frontend_route = page.serialize()
    _.set(_frontend_route, 'templates', [])
    let elements_list:string[]|string = await page.extractElementsNames()
    elements_list = elements_list.map(e=>`'${e}'`)
    elements_list = elements_list.join(',')
    const pages = await this.page.getPagesForFrontend();
    const page_areas =  await page.renderPageAreas()
    for(const screen of SCREENS){
      let fileName = this.getFilename(page)
      let children_content = await this.page.getChildrenContent(screen.name)
      const {extra_header_styles, extra_footer_styles} = await this.getExtraStyles(elements_list)
      let all_styles = await this.page.getAllStyles(screen.name)
      await this.addFile(fileName)
        .destinationDir(Application.resourcesPath(`${TemplateGenerator.screensDirectory}/${screen.name}/pages`))
        .stub(PageGenerator.template)
        .apply({
          hAltrp: Env.get('PATH_ENV') === 'production' ? `/modules/front-app/h-altrp.js?${env('PACKAGE_KEY')}` : 'http://localhost:3001/src/bundle.h-altrp.js',
          children_content,
          fonts,
          elements_list,
          pages: JSONStringifyEscape(pages),
          altrp_settings: JSONStringifyEscape(altrp_settings),
          _frontend_route: JSONStringifyEscape(_frontend_route),
          page_id: page.id,
          title: page.title,
          version: getLatestVersion(),
          page_areas,
          extra_header_styles,
          extra_footer_styles,
          all_styles,
          _altrp: JSONStringifyEscape({
            version: getLatestVersion(),
            isNodeJS: true
          }),
        })

    }
    return
  }
  async getExtraStyles(elementsList):Promise<{
    extra_header_styles:string
    extra_footer_styles:string
  }>{
    const extraStyles = {
      extra_header_styles: '',
      extra_footer_styles: '',
    }
    for(let element of elementsList){
      const fileName = app_path(`/altrp-templates/styles/elements/${element}.css`)
      if(fs.existsSync(fileName)){
        let content = fs.readFileSync(fileName, {encoding:'utf8'})
        content = content.replace(/\n/g, '')
        extraStyles.extra_header_styles += `
<style id="extra_header_styles">${content}</style>`
      }
    }
    return extraStyles
  }

  getFonts(): string {
    let fonts: string[] = this.getGlobal('fonts', [])
    return fonts.map(font => {
      if (font === 'Arial') {
        return ''
      }
      font = encodeURIComponent(font);
      font += ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic'
      let fontUrl = 'https://fonts.googleapis.com/css?family=' + font + '&subset=cyrillic';
      fontUrl = '<link rel="stylesheet"  href="' + fontUrl + '" />'
      return fontUrl
    }).join('')
  }
}
