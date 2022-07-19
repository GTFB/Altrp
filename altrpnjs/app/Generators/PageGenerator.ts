import fs from 'fs'
import BaseGenerator from "./BaseGenerator";
import Application from "@ioc:Adonis/Core/Application";
import app_path from "../../helpers/path/app_path";
import Page from "App/Models/Page";
import SCREENS from "../../helpers/const/SCREENS";
import TemplateGenerator from "App/Generators/TemplateGenerator";
import JSONStringifyEscape from "../../helpers/string/JSONStringifyEscape";
import * as _ from "lodash";
import getLatestVersion from "../../helpers/getLatestVersion";
import Env from "@ioc:Adonis/Core/Env";
import env from "../../helpers/env";
import base_path from "../../helpers/path/base_path";
import AltrpMeta from "App/Models/AltrpMeta";
import applyPluginsFiltersAsync from "../../helpers/plugins/applyPluginsFiltersAsync";
import FONTS, {GOOGLE_FONT} from "../../helpers/const/FONTS";
import clearRequireCache from "../../helpers/node-js/clearRequireCache";
import {encode} from "html-entities";
import get_altrp_setting from "../../helpers/get_altrp_setting";

export default class PageGenerator extends BaseGenerator {
  public __altrp_global__: {
    altrpSettings?: {
      action_components: string[],
      libsToLoad: string[],
      page_params: object,
      altrpMenus: any[]
    };
  } = {}

  setGlobal(path, value) {
    _.set(this.__altrp_global__, path, value)
  }

  getGlobal(path, _default: any = null): any {
    return _.get(this.__altrp_global__, path, _default)
  }

  public static directory = Application.resourcesPath('/views/altrp/pages')
  public static template = app_path(`altrp-templates/views/Page.stub`)
  public page: Page;


  async deleteFile(page: Page): Promise<void> {
    let fileName = this.getFilename(page)
    if (fs.existsSync(PageGenerator.directory + fileName)) {
      fs.rmSync(PageGenerator.directory + fileName);
    }
  }

  getFilename(page): string {
    return page.guid + '.html'
  }

  async run(page: Page) {
    if (!page) {
      return
    }


    if (!page.guid) {
      console.error(`Page ${page.id} render error. Need more data`);
      return
    }

    this.page = page
    this.setGlobal('altrpSettings', {})
    const altrp_settings = await page.getPageSettings(this)
    const fonts = this.getFonts()

    await page.load('data_sources', data_source => {
      data_source.preload('source', source => {
        source.preload('model', model => {
          model.preload('table')
        })
      })
    })
    const _frontend_route = page.serialize()
    _.set(_frontend_route, 'templates', [])
    let elements_list: string[] | string = await page.extractElementsNames()
    const {extra_header_styles, extra_footer_styles} = await this.getExtraStyles(elements_list)
    elements_list = elements_list.map(e => `'${e}'`)

    const head_start = get_altrp_setting('head_start', '', true)
    const head_end = get_altrp_setting('head_end', '', true)
    const body_start = get_altrp_setting('body_start', '', true)
    const body_end = get_altrp_setting('body_end', '', true)

    elements_list = elements_list.join(',')
    const favicons = this.getFavicons()
    const front_app_css = this.getFrontAppCss()

    const all_site_js = this.getFrontAppJs()
    const pages = await this.page.getPagesForFrontend();

    const page_areas = await page.renderPageAreas()


    let plugin_frontend_head = ''
    plugin_frontend_head = await applyPluginsFiltersAsync('plugin_frontend_head',
      plugin_frontend_head, page)

    let plugin_frontend_bottom = ''
    plugin_frontend_bottom = await applyPluginsFiltersAsync('plugin_frontend_bottom',
      plugin_frontend_bottom, page)

    let fileName = this.getFilename(page)

    for (const screen of SCREENS) {

      let children_content = await this.page.getChildrenContent(screen.name)
      let all_styles = ''
      try {
        all_styles = await this.page.getAllStyles(children_content)
      }catch (e) {
        console.error(e);
      }

      await this.addFile(fileName)
        .destinationDir(Application.resourcesPath(`${TemplateGenerator.screensDirectory}/${screen.name}/pages`))
        .stub(PageGenerator.template)
        .apply({
          hAltrp: Env.get('PATH_ENV') === 'production'
            ? `/modules/front-app/h-altrp.js?${env('PACKAGE_KEY')}`
            : 'http://localhost:3002/src/h-altrp.js',
          children_content,
          fonts,
          elements_list,
          pages: JSONStringifyEscape(pages),
          altrp_settings: JSONStringifyEscape(altrp_settings),
          _frontend_route: JSONStringifyEscape(_frontend_route),
          page_id: page.id,
          title: page.title,
          front_app_css,
          version: getLatestVersion(),
          page_areas,
          all_site_js,
          extra_header_styles,
          plugin_frontend_head,
          plugin_frontend_bottom,
          extra_footer_styles,
          head_start,
          head_end,
          body_start,
          body_end,
          favicons,
          all_styles,
          _altrp: JSONStringifyEscape({
            version: getLatestVersion(),
            pageGuid: page.guid,
            popupsGuids: await page.getPopupsGuids(),
            isNodeJS: true
          }),
        }, false, true)
    }
    clearRequireCache()
    return
  }

  async getExtraStyles(elementsList): Promise<{
    extra_header_styles: string
    extra_footer_styles: string
  }> {
    const extraStyles = {
      extra_header_styles: '',
      extra_footer_styles: '',
    }
    for (let element of elementsList) {
      const fileName = app_path(`/altrp-templates/styles/elements/${element}.css`)
      if (fs.existsSync(fileName)) {
        let content = fs.readFileSync(fileName, {encoding: 'utf8'})
        content = content.replace(/\n/g, '')
        extraStyles.extra_header_styles += `
<style id="extra_header_styles">${content}</style>`
      }
    }
    let global_styles_editor: AltrpMeta | string | null = await AltrpMeta.query().where('meta_name', 'global_styles_editor').first()
    if (global_styles_editor) {
      global_styles_editor = global_styles_editor.meta_value
      extraStyles.extra_header_styles += global_styles_editor ?
        `<style id="global_styles_editor">${global_styles_editor}</style>` : ''
    }
    return extraStyles
  }

  getFonts(): string {
    let fonts: string[] = this.getGlobal('fonts', [])
    return fonts.map(font => {
      if (FONTS[font] !== GOOGLE_FONT) {
        return ''
      }
      font = encodeURIComponent(font);
      font += ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic'
      let fontUrl = 'https://fonts.googleapis.com/css?family=' + font + '&subset=cyrillic&display=swap';
      fontUrl = '<link rel="stylesheet"  href="' + fontUrl + '" />'
      return fontUrl
    }).join('')
  }

  private getFavicons() {
    return fs.readFileSync(base_path('resources/views/favicons.html'), 'utf8')
  }

  private getFrontAppCss() {
    return fs.readFileSync(base_path('resources/views/front-app-css.html'), 'utf8')
  }

  private getFrontAppJs() {
    const options = {
      url: '/ajax/get-custom-js'
    };
    return `<script id="all_site_js" data-async-content-load="${encode(JSON.stringify(options))}"></script>`
  }
}
