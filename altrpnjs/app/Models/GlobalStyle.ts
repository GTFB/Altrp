import { DateTime } from 'luxon'
import {BaseModel, column, computed} from '@ioc:Adonis/Lucid/Orm'
import mbParseJSON from "../../helpers/mbParseJSON";

export default class GlobalStyle extends BaseModel {
  public static table = "altrp_global_template_styles";

  @column({ isPrimary: true })
  public id: number

  @column({
    serialize: (value: string) => {
      return JSON.parse(value)
    }
  })
  public settings: string | {
    name: string,
  }

  @column()
  public type: string

  @column()
  public guid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async getCssVars():Promise<string>{
    const globalStyles = await GlobalStyle.query()
    let css = `:root{
    `
    globalStyles.forEach((style:GlobalStyle) =>{

      css += style.getCss()

    })
    css+='}'
    return css
  }

  getCss(){
    let settings = mbParseJSON(this.settings, {})
    let css = ''

    switch(this.type){
      case 'color':{
        if(this.cssVar && settings.color){
          css = `${this.cssVar}: ${settings.color};`
        }
      }
        break;
      case 'font':{
        GlobalStyle.FONT_PROPERTIES.forEach(p=>{
          if(settings[p]){
            let value = settings[p]
            if(p === 'family'){
              value = `"${value}", Arial, sans-serif`
            }
            css += `--altrp-var-${this.type}-${settings?.name?.replace(/[^a-zA-Z0-9]/g,'-')}-${p}: ${value};`
          }
        })
        css += `--altrp-var-${this.type}-${settings?.name?.replace(/[^a-zA-Z0-9]/g,'-')}-font-size: ${
          settings?.size || '14'
        }${
          settings?.sizeUnit || 'px'

        };`
      }
        break;
      case 'effect': {

        if(this.cssVar){
          const type = settings.type || "";
          const horizontal = settings.horizontal || 0;
          const vertical = settings.vertical || 0;
          const blur = settings.blur || 0;
          const spread = settings.spread || 0;
          const color = settings.color || "";

          css += `${this.cssVar}: ${type} ${horizontal}px ${vertical}px ${blur}px ${spread}px ${color};`

        }
      }
      break;
    }

    return css
  }

  static FONT_PROPERTIES:string[] = [
    'decoration',
    'family',
    'lineHeight',
    'spacing',
    'weight',
    'style',
    'transform',
  ]
  @computed()
  public get cssVar(){
    let settings = mbParseJSON(this.settings, {})
    let cssVar = ''
    switch (this.type) {
      case 'color':
      case 'effect':{
        cssVar =  `--altrp-var-${this.type}-${settings?.name?.replace(/[^a-zA-Z0-9]/g,'-')}`
      }break;
      case 'font': {
        //console.log(settings?.name);
        // if(settings?.name === 'H1'){
        //   console.log(settings);
        // }

      }
    }
    return cssVar
  }

}
