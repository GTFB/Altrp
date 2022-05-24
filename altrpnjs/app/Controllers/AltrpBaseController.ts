import * as _ from 'lodash'
import Env from "@ioc:Adonis/Core/Env";
import ExportExcel from "App/Services/ExportExcel";
import ExportWord from "App/Services/ExportWord";
import replaceContentWithData from "../../helpers/replaceContentWithData";
import Model from "App/Models/Model";
import app_path from "../../helpers/path/app_path";
import isProd from "../../helpers/isProd";
import Source from "App/Models/Source";
import fetch from 'node-fetch';
import User from "App/Models/User";
import Notification from "App/Services/Notification";
import Customizer from "App/Models/Customizer";
import DiscordBot from "App/Services/DiscordBot";

export default class AltrpBaseController {
  protected customizerData = {
    env: Env,

  }
  protected setCustomizerData(path:string, data:any){
    _.set(this.customizerData, path, data)
  }
  protected unsetCustomizerData(path:string){
    _.unset(this.customizerData, path)
  }
  protected getCustomizerData(path:string, _default:any = null):any{
    return _.get(this.customizerData, path, _default)
  }

  protected async sendApiRequest() {
    const api = _.get(this.customizerData, "api");
    const request = _.get(this.customizerData, "context.request");

    const source = await Source.query().where("id", api.source).first();

    let url, method;

    if(source) {
      url = source.url;
      method = source.request_type;
    } else if(api.url) {
      url = api.url;
      method = api.method
    }

    if(url) {
      const headers = api.headers ? JSON.parse(api.headers) : {}

      let params = api.data;
      let data: any = {};

      if(params) {
        params = JSON.parse(params);
        params.map(param => {
          data[param[0]] = replaceContentWithData(param[1], this.customizerData)
        })
      }

      if(method === "get" || method === "delete") {
        data = null
      } else {
        data = JSON.stringify(data)
      }

      const basename = request.protocol() + "://" + request.host();

      const response = await fetch(basename + "/ajax/models" + url, {
        method: method,
        body: data,
        headers: {
          ...request.headers(),
          ...headers
        }
      })

      return await response.json()
    } else {
      return {
        success: false,
        message: "url is null"
      }
    }

  }

  discord() {
    const discord = _.get(this.customizerData, "discord")
    const content = JSON.parse(replaceContentWithData(discord, this.customizerData))

    DiscordBot.send(content)
  }

  protected async sendNotification() {
    const messageData = _.get(this.customizerData, "message")
    const content = JSON.parse(replaceContentWithData(messageData.content, this.customizerData))
    const entitiesData = JSON.parse(messageData.entitiesData)

    const users = await this.getRequiredUsers(messageData.entities, entitiesData)

    const notification = new Notification(content, messageData);
    await notification.send(users, this.customizerData)
  }

  protected async execCustomizer(name) {
    const customizer = await Customizer.query().where("name", name).preload("altrp_model").firstOrFail();

    const controllerName = app_path(`AltrpControllers/${customizer.altrp_model.name}Controller`);

    const ControllerClass = isProd() ? (await require(controllerName)).default
      : (await import(controllerName)).default
    const controller = new ControllerClass()

    const httpContext = _.get(this.customizerData, "httpContext");

    if(controller[customizer.name]) {
      return await controller[customizer.name](httpContext)
    } else {
      return {
        message: "customizer name invalid",
        success: false
      }
    }
  }

  protected async getRequiredUsers(entities, entitiesData): Promise<User[]> {
    switch (entities) {
      case "all": return await User.all()
      case "dynamic":
        const value = replaceContentWithData(entitiesData.dynamicValue, this.customizerData)
        const user = await User.query().where("id", value).firstOrFail();
        return [user]
        break
      case "specific":
        if(entitiesData.users.length > 0) {
          const userQuery = User.query();

          entitiesData.users.forEach((id, idx) => {
            if(idx === 0) {
              userQuery.where("id", id)
            } else {
              userQuery.orWhere("id", id)
            }
          })

          const users = await userQuery;

          return users
        } else if(entitiesData.roles.length > 0) {
          const users = await User.query().whereHas("roles", (query) => {
            entitiesData.roles.forEach((role, idx) => {
              if(idx === 0) {
                query.where("roles.id", role)
              } else {
                query.orWhere("roles.id", role)
              }
            })
          });

          return users
        }
    }

    return []
  }

  protected async execCrud() {
    const crud = _.get(this.customizerData, "crud");
    const body = JSON.parse(crud.body);

    const newData = {};

    if(crud.custom_data) {
      const customData = JSON.parse(crud.custom_data)

      customData.forEach((param) => {
        const key = param[0];
        const value = replaceContentWithData(param[1], this.customizerData);

        newData[key] = value;
      })
    }

    _.keys(body).forEach((key) => {
      const value = replaceContentWithData(body[key], this.customizerData);

      newData[key] = value;
    })

    const modelId = crud.model_id;

    const modelRecord = await Model.query().where("id", modelId).preload("parent").firstOrFail();
    const modelNamespace = modelRecord.parent ? modelRecord.name : modelRecord.name;

    const modelPath = app_path(`AltrpModels/${modelNamespace}`)

    const modelClass = isProd() ? (await require(modelPath)).default
      : (await import(modelPath)).default

    const method = crud.method;

    let model = null;

    let record: number|string|null = null;

    if(crud.record) {
      record = replaceContentWithData(crud.record, this.customizerData);

      if(record && _.isString(record)) {
        record = _.parseInt(record);
      }
    }

    switch (method) {
      case "create":
        model = await modelClass.create(newData);
        break
      case "update":
        if(record) {
          const columns = modelClass.$keys.attributesToColumns.all();

          model = await modelClass.query().where("id", record).firstOrFail();

          _.keys(newData).forEach(key => {
            const hasInColumns = columns[key];

            if(hasInColumns) {
              //@ts-ignore
              model[key] = newData[key]
            }
          })

          //@ts-ignore
          await model.save()
        }
        break
      case "delete":
        if(record) {
          model = await modelClass.query().where("id", record).firstOrFail();

          //@ts-ignore
          await model.delete()
        }
        break
    }

    return {
      model,
      success: true
    }
  }

  protected async toDocument() {
    const document = _.get(this.customizerData, "document");
    const model = _.get(this.customizerData, "context.CurrentModel");

    if(!document.fileName || !document.type) return;

    const content = await model.all();

    const modelColumns = model.$keys.attributesToColumns.all();
    const columns = _.keys(modelColumns)

    switch (document.type) {
      case "excel":
        const excel = new ExportExcel(content, columns, {
          name: model.name
        })

        excel.export(document.fileName)
        break
      case  "word":
        const word = new ExportWord(content, columns, {
          name: model.name
        });

        word.export(document.fileName)
        break;
      case "presentation":
        break
    }

    return {
      success: true,
      type: "document"
    }
  }
}
