import * as _ from 'lodash'
import Env from "@ioc:Adonis/Core/Env";
import ExportExcel from "App/Services/ExportExcel";
import ExportWord from "App/Services/ExportWord";

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
        console.log('ad')
    }

    return {
      success: true,
      type: "document"
    }
  }
}
