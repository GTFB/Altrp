// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import _, {parseInt} from 'lodash';
import GlobalStyle from "App/Models/GlobalStyle";
import { v4 as uuid } from "uuid";
import Template from "App/Models/Template";
import is_null from "../../../helpers/is_null";
import data_set from "../../../helpers/data_set";
import data_get from "../../../helpers/data_get";
import public_path from "../../../helpers/path/public_path";
import is_array from "../../../helpers/is_array";
import mbParseJSON from "../../../helpers/mbParseJSON";
import fs from "fs";

export default class GlobalTemplateStylesController {
  public async getCss(){
    return {success:true, data:`${await GlobalStyle.getCssVars()}`}
  }
  public async index() {
    if(! fs.existsSync(public_path('altrp/css/vars/altrp-vars.css'))){
      GlobalStyle.updateCssFile()
    }
    try {
      let globalStyles = await GlobalStyle.query()
      globalStyles = _.sortBy(globalStyles, i=>{
        const settings = mbParseJSON(i.settings, {})
        return settings.name
      })
      const groups = {};

      globalStyles.forEach((style) => {
        if(!groups[style.type]) groups[style.type] = [];

        groups[style.type].push(style)
      })
      return groups
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  public async store({ request, response }) {
    let data = request.body()

    if(!data.type || !data.settings) {
      response.status(500)
      return "fill all fields"
    }

    data.guid = uuid()
    //@ts-ignore
    delete data._type
    try {
      const style = await GlobalStyle.create(data)
      return style
    } catch (e) {
      console.error(e)
    }
  }

  public async destroy({request}) {
    const params = request.params();
    const id = parseInt(params.id);

    const style = await GlobalStyle.query().where("id", id).firstOrFail()

    style.delete()

    return {
      success: true
    }
  }

  public async update({request, response}) {
    const params = request.params();
    const id = parseInt(params.id);

    const style = await GlobalStyle.query().where("id", id).firstOrFail()

    const body = request.body();

    switch (style.type) {
      case "color":
      {
        // @ts-ignore
        const data = JSON.parse(style.settings);

        data.name = body.settings.name ?? data.name ?? body.name;
        data.color = body.settings.color ?? data.color ?? body.color;
        data.colorPickedHex = body.settings.colorPickedHex ?? data.colorPickedHex ?? body.colorPickedHex;
        data.colorRGB = body.settings.colorRGB ?? data.colorRGB ?? body.colorRGB;

        style.settings = JSON.stringify(data);
      }
        break
      default:
      {
        // @ts-ignore
        let data: any = JSON.parse(style.settings);
        data = body.settings ? {
          ...data,
          ...body.settings,
        } : {
          ...data,
          ...body,
        }
        style.settings = JSON.stringify(data);
      }
        break
    }

    if(!style.save()) {
      response.status(409)
      return "Save failed"
    }

    await this.updateStylesInAllTemplates(style)

    return style
  }

  private async updateStylesInAllTemplates(style) {
    let templates = await Template.all();
    templates.forEach((template) => {
     this.replaceGlobalStyles(template, style.guid, style.settings);
  });
  }

  public replaceGlobalStyles(element, guid, style)
  {
    let elementData = JSON.parse(element.data);
    elementData = GlobalTemplateStylesController.recursiveReplaceGlobalStyles(elementData, guid, style);
    element.data = JSON.stringify(elementData);
    element.save();
  }

  public static recursiveReplaceGlobalStyles(data, guid, style) {
    if(data.settings.global_styles_storage) {
      const globalStylesStorage = data.settings.global_styles_storage

      if(globalStylesStorage.length > 0) {
        globalStylesStorage.forEach(s => {
          if(!is_null(s)) {
            if(s.search("typographic") !== -1) {
              data_set(data, "settings.__altrpFonts__", s)
            }

            if(s.search("gradient-first-color:") !== -1) {
              const currentSetting = s.replace('gradient-first-color:', '')

              s = currentSetting;

              const dataSettings = data_get(data, `settings.${currentSetting}`);

              if(!is_array(dataSettings) && dataSettings <= 0) return;

              const newColor = style["color"];
              const oldColor = style["firstColor"];
              const newValue = dataSettings.value.replace(oldColor, newColor);

              dataSettings.secondColor = newColor;
              dataSettings.value = newValue

              style = dataSettings
            }

            if(s.search("gradient-second-color:") !== -1) {
              const currentSetting = s.replace('gradient-second-color:', '')

              s = currentSetting;

              const dataSettings = data_get(data, `settings.${currentSetting}`);

              if(!is_array(dataSettings) && dataSettings <= 0) return;

              const newColor = style["color"];
              const oldColor = style["secondColor"];
              const newValue = dataSettings.value.replace(oldColor, newColor);

              dataSettings.secondColor = newColor;
              dataSettings.value = newValue

              style = dataSettings
            }

            data_set(data, 'settings.' + s, style);
          }
        })
      }
    }

    if(data.children.length > 0) {
      data.children.forEach((child, idx) => {
        if(child !== null) {
          data.children[idx] = GlobalTemplateStylesController.recursiveReplaceGlobalStyles(child, guid, style)
        }
      })
    }

    return data
  }
}
