import {DateTime} from 'luxon'
import {BaseModel, column, computed, afterCreate, afterUpdate, belongsTo} from '@ioc:Adonis/Lucid/Orm'
import mbParseJSON from "../../helpers/mbParseJSON";
import SCREENS from "../../helpers/const/SCREENS";
import _ from 'lodash'
import {optimizeStyles} from "../../helpers/screen";
import BaseGenerator from "App/Generators/BaseGenerator";
import Category from "App/Models/Category";
import Template from "App/Models/Template";
import DEFAULT_BREAKPOINT from "../../helpers/const/DEFAULT_BREAKPOINT";

export default class GlobalStyle extends BaseModel {
  public static table = "altrp_global_template_styles";

  @column({isPrimary: true})
  public id: number


  @column()
  public category_guid

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

  @belongsTo(()=>Category, {
    localKey: 'guid',
    foreignKey: 'category_guid',
  })
  public category

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
  static reverseScreens = SCREENS.slice().reverse()

  public static async getCssVars(onlyUsed = false): Promise<string> {
    let globalStyles:any = await GlobalStyle.query()

    if(onlyUsed){
      globalStyles = await Promise.all(globalStyles.map(async (gs)=>{
        const settings=  mbParseJSON(gs.settings, {})
        if(!settings && settings?.force){
          return gs
        }
        if(! gs.cssVar){
          return gs
        }
        const query = Template.query().where('type', 'template')
          .whereRaw(`"styles" ILIKE '%${gs.cssVar}%'`)

        return await query.first() ? gs : null
      }))
      globalStyles = globalStyles.filter(gs => gs)
    }

    let css = `:root{
    `
    globalStyles.forEach((style: GlobalStyle) => {

      css += style.getCss()

    })
    css += '}'
    const sizeAndFonts = globalStyles.filter(gs => {
      return gs.type === 'font' || gs.type === 'size'
    })
    if (sizeAndFonts.length) {

      SCREENS.forEach((currentScreen, idx) => {
        if (idx === 0) {
          return
        }
        css += `${currentScreen.fullMediaQuery}{
        :root{
        `
        sizeAndFonts.forEach(style => {

          css += style.getCss(currentScreen)
        })
        css += `
  }
}`

      })
    }

    const _styles: string[] = []
    const optimizedStyles =  await optimizeStyles(css)
    optimizedStyles.forEach(([mediaQuery, queryStyles]: string[]) => {
      mediaQuery ? _styles.push(`${mediaQuery}{${queryStyles}}`) : _styles.push(queryStyles)
    })

    return _styles.join('')
  }

  getCss(currentScreen: {
    name: string
  } | null = null) {
    let settings = mbParseJSON(this.settings, {})
    let css = ''

    switch (this.type) {
      case 'color': {
        if (this.cssVar && settings.color) {
          css = `${this.cssVar}: ${settings.color};`
        }
      }
        break;
      case 'font': {
        let size
        let sizeUnit
        if (!currentScreen?.name) {

          GlobalStyle.FONT_PROPERTIES.forEach(p => {
            if (settings[p]) {
              let value = settings[p]
              if (p === 'family') {
                value = `"${value}", Arial, sans-serif`
              }
              if (p === 'spacing') {
                value = `${value}em`
              }
              css += `--altrp-var-${this.type}-${settings?.name?.replace(/[^a-zA-Z0-9]/g, '-')}-${p}: ${value};`
            }
          })
        } else {

          const screenIndex = _.findIndex(GlobalStyle.reverseScreens, s => s.name === currentScreen.name)
          const screens = GlobalStyle.reverseScreens.slice(screenIndex)

          GlobalStyle.FONT_PROPERTIES.forEach(p => {
            let value = _.get(settings, `${currentScreen.name}.${p}`)

            screens.forEach(s => {
              if(s.name === SCREENS[0].name){
                return
              }
              if (!value) {
                value = _.get(settings, `${s.name}.${p}`)
              }
            })
            if (value) {

              css += `--altrp-var-${this.type}-${settings?.name?.replace(/[^a-zA-Z0-9]/g, '-')}-${p}: ${value};`
            }
          })
          size = _.get(settings, `${currentScreen.name}.size`)

          sizeUnit = _.get(settings, `${currentScreen.name}.sizeUnit`)
          screens.forEach(s => {
            if(s.name === SCREENS[0].name){
              return
            }
            if (!size) {
              size = _.get(settings, `${s.name}.size`)

            }
            if (!sizeUnit) {
              sizeUnit = _.get(settings, `${s.name}.sizeUnit`)
            }
          })
        }

        size = size || settings.size
        sizeUnit = sizeUnit || settings.sizeUnit

        size && (css += `--altrp-var-${this.type}-${settings?.name?.replace(/[^a-zA-Z0-9]/g, '-')}-font-size: ${
          size
        }${
          sizeUnit || 'px'
        };`)
      }
        break;
      case 'effect': {

        if (this.cssVar) {
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
      case 'size': {

        if (this.cssVar) {
          let _settings
          if(! currentScreen || DEFAULT_BREAKPOINT === currentScreen.name){
            _settings = settings
          } else {
            _settings = settings[currentScreen.name]

          }
          if(! _settings){
            return'';
          }
          css += `${this.cssVar}: ${_settings.top}${_settings.unit} ${_settings.right}${_settings.unit} ${_settings.bottom}${_settings.unit} ${_settings.left}${_settings.unit};`
        }
      }
        break;
    }

    return css
  }

  static FONT_PROPERTIES: string[] = [
    'decoration',
    'family',
    'lineHeight',
    'spacing',
    'weight',
    'style',
    'transform',
  ]

  @computed()
  public get cssVar() {
    let settings = mbParseJSON(this.settings, {})
    let cssVar = ''
    switch (this.type) {
      case 'size':
      case 'color':
      case 'effect': {
        cssVar = `--altrp-var-${this.type}-${settings?.name?.replace(/[^a-zA-Z0-9]/g, '-')}`
      }
        break;
      case 'font': {
      }
    }
    return cssVar
  }
  @afterUpdate()
  @afterCreate()
  public static async _updateCssFile() {
    await GlobalStyle.updateCssFile()
  }

  public static async updateCssFile() {
    const css = await GlobalStyle.getCssVars(true)
    BaseGenerator.generateCssFile('altrp-vars', css, 'vars').catch(e=>{
      console.error(`Error while generateCssFile`, e)
    })
  }
}
