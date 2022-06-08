import {BaseGenerator} from "App/Generators/BaseGenerator";
import app_path from "../../helpers/path/app_path";
import isProd from "../../helpers/isProd";
import fs from "fs";
import path from "path"
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

    ListenerGenerator.getHookListeners(this)

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
  getDir() {
    const dir = path.join(ListenerGenerator.directory, this.customizer.settings.hook_type)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true})
    }
    return dir
  }

  public async hookListeners() {
    const dir = ListenerGenerator.directory + "hooks.listeners";

    if (!fs.existsSync(ListenerGenerator.directory)){
      fs.mkdirSync(ListenerGenerator.directory);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    let imports = "";
    let content = "";

    content = await this.applyFilters("listeners", content);

    imports = await this.applyFilters("listener_imports", imports);

    if(content) {
      await this.addFile( "listener" + ListenerGenerator.ext)
        .destinationDir(dir)
        .stub(ListenerGenerator.template)
        .apply({
          listener: "listener",
          imports,
          content
        });
    }
  }

  static async getHookListeners(listenerGenerator) {
    const dir = ListenerGenerator.directory + "hooks.listeners";
    const filePath = `${dir}/listener${this.ext}`;

    if(fs.existsSync(filePath)) {
      try {
        const hook = isProd() ? (await require(filePath)).default
          : (await import(filePath)).default

        hook("listenrs", listenerGenerator)
      } catch (err) {
        console.error(err)
      }
    }
  }

  public async hookTemplates() {
    const dir = ListenerGenerator.directory + "hooks.templates";

    if (!fs.existsSync(ListenerGenerator.directory)){
      fs.mkdirSync(ListenerGenerator.directory);
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);

      let imports = "";
      let content = "";

      content = await this.applyFilters("templates", content);

      imports = await this.applyFilters("listener_imports", imports);

      if (content) {
        await this.addFile("listener" + ListenerGenerator.ext)
          .destinationDir(dir)
          .stub(ListenerGenerator.template)
          .apply({
            listener: "listener",
            imports,
            content
          });
      }
    }
  }
  static async getHookTemplates(templateGenerator) {
    const dir = ListenerGenerator.directory + "hooks.templates";
    const filePath = `${dir}/listener${this.ext}`;

    if(fs.existsSync(filePath)) {
      try {
        const hook = isProd() ? (await require(filePath)).default
          : (await import(filePath)).default

        hook("templates", templateGenerator)
      } catch (err) {
        console.error(err)
      }
    }
  }

  public async hookControllers() {
    const dir = ListenerGenerator.directory + "hooks.controllers";

    if (!fs.existsSync(ListenerGenerator.directory)){
      fs.mkdirSync(ListenerGenerator.directory);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    let imports = "";
    let content = "";

    content = await this.applyFilters("controllers", content);

    imports = await this.applyFilters("listener_imports", imports);

    if(content) {
      await this.addFile( "listener" + ListenerGenerator.ext)
        .destinationDir(dir)
        .stub(ListenerGenerator.template)
        .apply({
          listener: "listener",
          imports,
          content
        });
    }
  }

  static async getHookControllers(controllerGenerator) {
    const dir = ListenerGenerator.directory + "hooks.controllers";
    const filePath = `${dir}/listener${this.ext}`;

    if(fs.existsSync(filePath)) {
      try {
        const hook = isProd() ? (await require(filePath)).default
          : (await import(filePath)).default

        hook("controllers", controllerGenerator)
      } catch (err) {
        console.error(err)
      }
    }
  }

  public async hookModels() {
    const dir = ListenerGenerator.directory + "hooks.models";

    if (!fs.existsSync(ListenerGenerator.directory)){
      fs.mkdirSync(ListenerGenerator.directory);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }


    let imports = "";
    let content = "";

    content = await this.applyFilters("models", content);
    imports = await this.applyFilters("listener_imports", imports);

    if(content) {
      await this.addFile( "listener" + ListenerGenerator.ext)
        .destinationDir(dir)
        .stub(ListenerGenerator.template)
        .apply({
          listener: "listener",
          imports,
          content
        });
    }
  }

  static async getHookModels(modelGenerator) {
    const dir = ListenerGenerator.directory + "hooks.models";
    const filePath = `${dir}/listener${this.ext}`;

    if(fs.existsSync(filePath)) {
      try {
        const hook = isProd() ? (await require(filePath)).default
          : (await import(filePath)).default

        hook("models", modelGenerator)
      } catch (err) {
        console.error(err)
      }
    }
  }

  public async hookPages() {
    const dir = ListenerGenerator.directory + "hooks.pages";

    if (!fs.existsSync(ListenerGenerator.directory)){
      fs.mkdirSync(ListenerGenerator.directory);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    let imports = "";
    let content = "";

    content = await this.applyFilters("pages", content);

    imports = await this.applyFilters("listener_imports", imports);

    if(content) {
      await this.addFile( "listener" + ListenerGenerator.ext)
        .destinationDir(dir)
        .stub(ListenerGenerator.template)
        .apply({
          listener: "listener",
          imports,
          content
        });
    }
  }

  static async getHookPages(pagesGenerator) {
    const dir = ListenerGenerator.directory + "hooks.pages";
    const filePath = `${dir}/listener${this.ext}`;

    if (fs.existsSync(filePath)) {
      try {
        const hook = isProd() ? (await require(filePath)).default
          : (await import(filePath)).default

        hook("pages", pagesGenerator)
      } catch (err) {
        console.error(err)
      }
    }
  }

  public async delete(customizer:Customizer) {//todo: don't need listeners delete
    if(!customizer) {
      return
    }
    this.customizer = customizer

    const dir = ListenerGenerator.directory + "altrp_models" + "." + customizer.settings.type;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    if(! fs.readdirSync(this.getDir()).length){
      fs.rmSync(this.getDir())
    }
  }
}
