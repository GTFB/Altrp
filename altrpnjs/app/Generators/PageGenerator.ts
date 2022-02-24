import fs from 'fs'
import {BaseGenerator} from "./BaseGenerator";
import Application from "@ioc:Adonis/Core/Application";
import app_path from "../../helpers/app_path";
import Page from "App/Models/Page";

export default class PageGenerator extends BaseGenerator {

  public static directory = Application.resourcesPath('/views/altrp/pages')
  public static template = app_path(`altrp-templates/views/Page.stub`)


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
    let all_styles = await page.getAllStyles()
    return await this.addFile(fileName)
      .destinationDir(PageGenerator.directory)
      .stub(PageGenerator.template)
      .apply({
        children_content,
        all_styles,
      })

  }
}
