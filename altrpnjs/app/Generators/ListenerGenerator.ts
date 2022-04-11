import {BaseGenerator} from "App/Generators/BaseGenerator";
import app_path from "../../helpers/app_path";
import isProd from "../../helpers/isProd";
import fs from "fs";
import path from "path";
import Customizer from "App/Models/Customizer";


export default class ListenerGenerator extends BaseGenerator {
  public static directory = app_path('/AltrpListeners/')
  public static listeners =  [
    'beforeSave',
    'beforeCreate',
    'beforeUpdate',
    'beforeDelete',
    'beforeFind',
    'beforePaginate',
    'afterSave',
    'afterCreate',
    'afterUpdate',
    'afterDelete',
    'afterFind',
    'afterPaginate'
  ]

  public static ext = isProd() ? '.js': '.ts'
  private static template = app_path(`/altrp-templates/${isProd() ? 'prod' : 'dev'}/AltrpListener.stub`)
  private customizer: Customizer

  public async run(customizer: Customizer) {

    this.customizer  = customizer
    if(!customizer || !customizer.settings.hook_type) {
      return
    }


    let imports = "";
    let content = this.customizer.getMethodContent()

    content = await this.applyFilters("templates", content);

    imports = await this.applyFilters("listener_imports", imports);
    await this.addFile( customizer.name + ListenerGenerator.ext)
      .destinationDir(this.getDir())
      .stub(ListenerGenerator.template)
      .apply({
        name: customizer.name,
        imports,
        content
      });
  }

  getFilename(){
    return  path.join(this.getDir(), this.customizer.name + ListenerGenerator.ext)
  }
  getDir(){
    const dir = path.join(ListenerGenerator.directory , this.customizer.settings.hook_type )
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir, {recursive:true})
    }

    return  dir
  }

  public async delete(customizer: Customizer) {
    this.customizer  = customizer
    if(!customizer || !customizer.settings.hook_type) {
      return
    }
    const fileName = this.getFilename()
    if(fs.existsSync(fileName)) {
      fs.rmSync(fileName)
    }
    if(! fs.readdirSync(this.getDir()).length){
      fs.rmdirSync(this.getDir())
    }
  }
}
