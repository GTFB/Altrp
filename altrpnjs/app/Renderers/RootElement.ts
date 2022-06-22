import app_path from "../../helpers/path/app_path";
import fs from "fs";
import * as mustache from 'mustache'
import ElementRenderer from "App/Renderers/ElementRenderer";

export default class RootElementRenderer{
  private static stub = app_path('/altrp-templates/views/elements/root-element.stub')
  private settings: any;
  private id: string;
  private children: Array<any>;
  constructor(private element: {
    settings: object,
    settingsLock: object,
    children: object[],
    id: string
  } ) {
    this.settings = {
      ...this.element.settings,
      ...this.element.settingsLock,
    }
    this.children  = this.element.children || []
    this.id = element.id
  }
  async render(screenName:string){
    let content :string = ''
    if(fs.existsSync(RootElementRenderer.stub)){
      content = fs.readFileSync(RootElementRenderer.stub, {encoding:'utf8'})
    }
    let children_content = ''
    for(let child of this.children){
      try {
        // let path = child.type === 'widget' ? `./widgets/${child.name}` : `./${child.name}`
        const renderer = new ElementRenderer(child)
        children_content += await renderer.render(screenName)
      } catch (e) {
        console.error(`Render Error element ${child.name}
        ${e.message}
        ${e.stack}
        `);
      }
    }
    let wrapper_attributes = ''
    content = mustache.render(content, {
      settings: JSON.stringify(this.settings),
      id: this.id,
      children_content,
      wrapper_attributes
    })
    return content;
  }
}
