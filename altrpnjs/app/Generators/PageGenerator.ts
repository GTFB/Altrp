import fs from 'fs'
import {BaseGenerator} from "./BaseGenerator";
import Application from "@ioc:Adonis/Core/Application";
import app_path from "../../helpers/path/app_path";
import Page from "App/Models/Page";
import SCREENS from "../../helpers/const/SCREENS";
import TemplateGenerator from "App/Generators/TemplateGenerator";

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


    if (!page.guid ) {
      console.error(`Page ${page.id} render error. Need more data`);
      return
    }
    this.page = page

    for(const screen of SCREENS){
      let fileName = this.getFilename(page)
      let children_content = await this.page.getChildrenContent(screen.name)

      let elements_list:string[]|string = await page.extractElementsNames()
      const {extra_header_styles, extra_footer_styles} = await this.getExtraStyles(elements_list)
      elements_list = elements_list.map(e=>`'${e}'`)
      elements_list = elements_list.join(',')
      let all_styles = await this.page.getAllStyles(screen.name)
      await this.addFile(fileName)
        .destinationDir(Application.resourcesPath(`${TemplateGenerator.screensDirectory}/${screen.name}/pages`))
        .stub(PageGenerator.template)
        .apply({
          children_content,
          elements_list,
          page_areas: await page.renderPageAreas(),
          extra_header_styles,
          extra_footer_styles,
          all_styles,
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
        extraStyles.extra_header_styles += `<style>${content}</style>`
      }
    }
    return extraStyles
  }

}
