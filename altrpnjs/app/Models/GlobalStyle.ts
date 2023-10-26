import {DateTime} from 'luxon'
import {BaseModel, column, computed, afterCreate, afterUpdate} from '@ioc:Adonis/Lucid/Orm'
import mbParseJSON from "../../helpers/mbParseJSON";
import SCREENS from "../../helpers/const/SCREENS";
import _ from 'lodash'
import {optimizeStyles} from "../../helpers/screen";
import BaseGenerator from "App/Generators/BaseGenerator";

export default class GlobalStyle extends BaseModel {
  public static table = "altrp_global_template_styles";

  @column({isPrimary: true})
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

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
  static reverseScreens = SCREENS.slice().reverse()

  public static async getCssVars(): Promise<string> {
    const globalStyles = await GlobalStyle.query()
    let css = `:root{
    `
    globalStyles.forEach((style: GlobalStyle) => {

      css += style.getCss()

    })
    css += '}'
    const fonts = globalStyles.filter(gs => {
      return gs.type === 'font'
    })
    if (fonts.length) {

      SCREENS.forEach((currentScreen, idx) => {
        if (idx === 0) {
          return
        }
        css += `${currentScreen.fullMediaQuery}{
        :root{
        `
        fonts.forEach(font => {

          css += font.getCss(currentScreen)
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
  public static async updateCssFile() {
    const css = await GlobalStyle.getCssVars()
    BaseGenerator.generateCssFile('altrp-vars', css, 'vars')
  }
}
