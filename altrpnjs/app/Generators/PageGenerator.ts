import fs from 'fs'
import {BaseGenerator} from "./BaseGenerator";
import Application from "@ioc:Adonis/Core/Application";
import app_path from "../../helpers/path/app_path";
import Page from "App/Models/Page";
import AltrpMeta from "App/Models/AltrpMeta";
import applyPluginsFiltersAsync from "../../helpers/plugins/applyPluginsFiltersAsync";
import get_altrp_setting from "../../helpers/get_altrp_setting";

export default class PageGenerator extends BaseGenerator {

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


    let fileName = this.getFilename(page)
    if (!page.guid ) {
      console.error(`Page ${page.id} render error. Need more data`);
      return
    }
    let children_content = await page.getChildrenContent()
    const head_start = get_altrp_setting('head_start', '', true)
    const head_end = get_altrp_setting('head_end', '', true)
    const body_start = get_altrp_setting('body_start', '', true)
    const body_end = get_altrp_setting('body_end', '', true)
    let elements_list:string[]|string = await page.extractElementsNames()
    const {extra_header_styles, extra_footer_styles} = await this.getExtraStyles(elements_list)
    elements_list = elements_list.map(e=>`'${e}'`)
    elements_list = elements_list.join(',')
    let all_styles = await page.getAllStyles()

    this.page = page

    let plugin_frontend_head = ''
    plugin_frontend_head = await applyPluginsFiltersAsync('plugin_frontend_head',
      plugin_frontend_head, page)

    let plugin_frontend_bottom = ''
    plugin_frontend_bottom = await applyPluginsFiltersAsync('plugin_frontend_bottom',
      plugin_frontend_bottom, page )

    return await this.addFile(fileName)
      .destinationDir(PageGenerator.directory)
      .stub(PageGenerator.template)
      .apply({
        children_content,
        head_start,
        head_end,
        body_start,
        body_end,
        elements_list,
        extra_header_styles,
        plugin_frontend_head,
        plugin_frontend_bottom,
        extra_footer_styles,
        all_styles,
      })

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
    let global_styles_editor:AltrpMeta|string|null = await AltrpMeta.query().where('meta_name', 'global_styles_editor').first()
    if(global_styles_editor){
      global_styles_editor = global_styles_editor.meta_value
      extraStyles.extra_header_styles += global_styles_editor ?
        `<style id="global_styles_editor">${global_styles_editor}</style>` : ''
    }
    return extraStyles
  }
}
