import {BaseGenerator} from "App/Generators/BaseGenerator";
import app_path from "../../helpers/app_path";
import isProd from "../../helpers/isProd";
import fs from "fs";
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

  public async run(customizer, type) {
    if(!customizer || !type) {
      return
    }

    this.customizer = customizer;

    const dir = ListenerGenerator.directory + "altrp_models" + "." + type;

    if (!fs.existsSync(ListenerGenerator.directory)){
      fs.mkdirSync(ListenerGenerator.directory);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    const listener = type

    let imports = "";
    let content = "";

    await this.addFile( listener + ListenerGenerator.ext)
      .destinationDir(dir)
      .stub(ListenerGenerator.template)
      .apply({
        listener,
        imports,
        content
      });
  }

  public async hookTemplates() {
    const dir = ListenerGenerator.directory + "hooks.templates";

    if (!fs.existsSync(ListenerGenerator.directory)){
      fs.mkdirSync(ListenerGenerator.directory);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    let imports = "";
    let content = "";

    content = await this.applyFilters("templates", "array");

    imports = await this.applyFilters("listener_imports");

    await this.addFile( "listener" + ListenerGenerator.ext)
      .destinationDir(dir)
      .stub(ListenerGenerator.template)
      .apply({
        listener: "listener",
        imports,
        content
      });
  }

  static async getHookTemplates(template) {
    const dir = ListenerGenerator.directory + "hooks.templates";
    const filePath = `${dir}/listener${this.ext}`;

    try {
      const hook = isProd() ? (await require(filePath)).default
        : (await import(filePath)).default

      hook("template", template)
    } catch (err) {
      console.log(err)
    }
  }

  public async delete(type) {
    if(!type) {
      return
    }


    const dir = ListenerGenerator.directory + "altrp_models" + "." + type;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    const listener = type

    if(fs.existsSync(dir + "\\" + listener + ListenerGenerator.ext)) {
      fs.unlinkSync(dir + "\\" + listener + ListenerGenerator.ext)
    }
  }
}
