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

  public async run(model, data) {
    if(!model || !data) {
      return
    }

    if(!data.data.socket_type || !data.data.socket_listener) {
      return
    }

    this.model = model;

    const dir = ListenerGenerator.directory + this.model.name;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    const listener = data.data.socket_listener

    console.log(this.model.name + ":" + listener + ListenerGenerator.ext)
    await this.addFile( listener + ListenerGenerator.ext)
      .destinationDir(dir)
      .stub(ListenerGenerator.template)
      .apply({
        listener,
      });
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
