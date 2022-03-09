import {BaseGenerator} from "App/Generators/BaseGenerator";
import app_path from "../../helpers/app_path";
import isProd from "../../helpers/isProd";
import Model from "App/Models/Model";
import fs from "fs";


export default class ListenerGenerator extends BaseGenerator {
  public static directory = app_path('/altrp-listeners/')
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
  private model: Model

  public async run(model, type) {
    if(!model || !type) {
      return
    }

    this.model = model;

    const dir = ListenerGenerator.directory + "altrp_models" + "." + this.model.name + "." + type;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    const listener = type

    await this.addFile( listener + ListenerGenerator.ext)
      .destinationDir(dir)
      .stub(ListenerGenerator.template)
      .apply({
        listener,
      });
  }

  public async delete(model, type) {
    if(!model || !type) {
      return
    }

    this.model = model;

    const dir = ListenerGenerator.directory + "altrp_models" + "." + this.model.name + "." + type;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    const listener = type

    fs.unlinkSync(dir + "\\" + listener + ListenerGenerator.ext)
  }

  public async runAll(model) {
    if(!model) {
      return
    }

    this.model = model;

    const dir = ListenerGenerator.directory + this.model.name;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    for (const listener of ListenerGenerator.listeners) {
      await this.addFile(listener + ListenerGenerator.ext)
        .destinationDir(dir)
        .stub(ListenerGenerator.template)
        .apply({
          listener,
        });
    }

  }
}
