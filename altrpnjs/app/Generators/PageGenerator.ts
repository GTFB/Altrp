import * as mustache from'mustache'
import {minify} from 'html-minifier'
import fs from 'fs'
import BaseGenerator from "./BaseGenerator";
import Application from "@ioc:Adonis/Core/Application";
import app_path from "../../helpers/path/app_path";
import Page from "App/Models/Page";
import SCREENS from "../../helpers/const/SCREENS";
import JSONStringifyEscape from "../../helpers/string/JSONStringifyEscape";
import * as _ from "lodash";
import getLatestVersion from "../../helpers/getLatestVersion";
import Env from "@ioc:Adonis/Core/Env";
import base_path from "../../helpers/path/base_path";
import AltrpMeta from "App/Models/AltrpMeta";
import applyPluginsFiltersAsync from "../../helpers/plugins/applyPluginsFiltersAsync";
import FONTS, {GOOGLE_FONT} from "../../helpers/const/FONTS";
import clearRequireCache from "../../helpers/node-js/clearRequireCache";
import {encode} from "html-entities";
import get_altrp_setting from "../../helpers/get_altrp_setting";
import storage_path from "../../helpers/storage_path";
import config from "../../helpers/config";
import altrpRandomId from "../../helpers/altrpRandomId";
import {DateTime} from "luxon";
import Menu from "App/Models/Menu";

export default class PageGenerator extends BaseGenerator {
  public __altrp_global__: {
    altrpSettings?: {
      action_components: string[],
      libsToLoad: string[],
      page_params: object,
      altrpMenus: any[]
    };
  } = {}
  public static screensDirectory = '/views/altrp/screens'

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
      return false
    }

    if (!page.guid) {
      console.error(`Page ${page.id} render error. Need more data`);
      return false
    }

    const randomString = altrpRandomId()

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

    let presets = []

    let elements_list: string[] | string = await page.extractElementsNames(true, presets)

    let all_elements_list: string[] | string = await page.extractElementsNames(false)
    presets = _.uniq(presets)
    let presetsLinks = presets.map(p=>{
      return `<link rel="stylesheet" href="/altrp/css/altrp-presets/${p}.css?${randomString}"/>`
    }).join('')

    const {extra_header_styles, extra_footer_styles} = await this.getExtraStyles(elements_list, all_elements_list)
    elements_list = elements_list.map(e => `'${e}'`)

    const head_start = get_altrp_setting('head_start', '', true)
    const head_end = get_altrp_setting('head_end', '', true) + presetsLinks
    const body_start = get_altrp_setting('body_start', '', true)
    const body_end = get_altrp_setting('body_end', '', true)

    elements_list = elements_list.join(',')
    const favicons = this.getFavicons()
    const front_app_css = this.getFrontAppCss()

    const all_site_js = this.getFrontAppJs()
    const pages = await this.page.getPagesForFrontend();
    pages.forEach(page => {
      page?.data_sources?.map(data_source => {
        if(data_source?.source?.web_url){
          // @ts-ignore
          data_source.source.web_url = data_source?.source?.web_url.replace(config('app.url'), '')
        }
      })
    })
    const pageAreas = await page.renderPageAreas()
    const areasStore = storage_path(`pages-content/areas/${page.guid}.html`)

    fs.mkdirSync(storage_path(`pages-content/areas`), {recursive: true})
    fs.writeFileSync(areasStore, pageAreas)

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
      let menus = await Menu.getJSON( {
        content:children_content,
        moreContent:[pageAreas],
        raw: true})
      try {
        all_styles = await this.page.getAllStyles(children_content)
      }catch (e) {
        console.error(e);
      }
      const stylesStore = storage_path(`pages-content/styles/${screen.name}/${page.guid}.html`)
      fs.mkdirSync(storage_path(`pages-content/styles/${screen.name}`), {recursive: true})
      all_styles = minify(all_styles + front_app_css, {
        collapseWhitespace:true,
        minifyCSS: true,
      })
      fs.writeFileSync(stylesStore, all_styles )


      await this.addFile(fileName)
        .destinationDir(Application.resourcesPath(`${PageGenerator.screensDirectory}/${screen.name}/pages`))
        .stub(PageGenerator.template)
        .apply({
          hAltrp: Env.get('PATH_ENV') === 'production'
            ? `/modules/front-app/h-altrp.js?${randomString}`
            : `http://localhost:3002/src/h-altrp.js?${randomString}`,
          children_content,
          fonts,
          randomString,
          random_string: randomString,
          elements_list,
          pages: JSONStringifyEscape(pages),
          altrp_settings: JSONStringifyEscape(altrp_settings),
          page_id: page.id,
          title: page.title,
          version: getLatestVersion(),
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
          _altrp: JSONStringifyEscape({
            version: getLatestVersion(),
            pageGuid: page.guid,
            popupsGuids: await page.getPopupsGuids(),
            randomString,
            menus,
            isNodeJS: true
          }),
        }, false, true)
    }
    page.updatedAt = DateTime.now()
    await page.save()
    clearRequireCache()

    return true
  }

  async getExtraStyles(reactElementsList, allElementsList: any = []): Promise<{
    extra_header_styles: string
    extra_footer_styles: string
  }> {

    let extraStyles = {
      extra_header_styles: '',
      extra_footer_styles: '',
    }
    extraStyles.extra_header_styles += `<style id="extra_header_styles">`


    for (let element of reactElementsList) {
      const fileName = app_path(`/altrp-templates/styles/elements/${element}.css`)
      if (fs.existsSync(fileName)) {
        let content = fs.readFileSync(fileName, {encoding: 'utf8'})
        content = content.replace(/\n/g, '')
        extraStyles.extra_header_styles += content
      }
    }
    extraStyles.extra_header_styles += `</style>`
    let global_styles_editor: AltrpMeta | string | null = await AltrpMeta.query().where('meta_name', 'global_styles_editor').first()
    if (global_styles_editor) {
      global_styles_editor = global_styles_editor.meta_value
      extraStyles.extra_header_styles += global_styles_editor ?
        `<style id="global_styles_editor">${global_styles_editor}</style>` : ''
    }
    extraStyles = await applyPluginsFiltersAsync('extra_styles_filter', extraStyles, reactElementsList, allElementsList)

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

  getFrontAppCss() {
    let content = fs.readFileSync(base_path('resources/views/front-app-css.html'), 'utf8')
    const container_width = get_altrp_setting('container_width','1440')
    content = mustache.render(content, {
      container_width
    })
    return content
  }

  private getFrontAppJs() {
    const options = {
      url: '/ajax/get-custom-js'
    };
    return `<script id="all_site_js" data-async-content-load="${encode(JSON.stringify(options))}"></script>`
  }
}
