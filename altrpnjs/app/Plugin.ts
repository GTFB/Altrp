import path from 'path'
import AdmZip from "adm-zip"
import Logger from '@ioc:Adonis/Core/Logger'
import updateDotenv from 'update-dotenv'
import env from '../helpers/env'
import public_path from '../helpers/public_path'
import NotFoundException from 'App/Exceptions/NotFoundException'
import app_path from '../helpers/app_path'
import fs from 'fs-extra'
import envWriter from '../helpers/envWriter'
import * as _ from 'lodash'
import is_null from "../helpers/is_null";
import data_get from "../helpers/data_get";
import AltrpMeta from "App/Models/AltrpMeta";
import data_set from "../helpers/data_set";
import is_array from "../helpers/is_array";
import isValidUrl from "../helpers/string/isValidUrl";
import {RequestContract} from "@ioc:Adonis/Core/Request";
import storage_path from "../helpers/storage_path";
import httpsRequest from "../helpers/httpsRequest";

export default class Plugin {

  /**
   * Ключ списка плагинов в .env
   */
  static ALTRP_PLUGINS = 'ALTRP_PLUGINS'
  /**
   * Ключ списка виджетов в .env
   */
  static ALTRP_PLUGINS_WIDGET_LIST = 'ALTRP_PLUGINS_WIDGET_LIST'
  /**
   * Ключ списка виджетов в plugin_meta
   */
  static PLUGIN_WIDGETS = 'plugin_widgets'
  /**
   * Ключ списка статики активных плагинов в таблице altrp_meta
   */
  static ALTRP_STATIC_META = 'altrp_static_meta'

  /**
   * список локаций для статики в шаблонах
   */
  static STATIC_LOCATIONS_LIST = [
    'front_head_styles',
    'front_bottom_styles',
    'front_head_scripts',
    'front_bottom_scripts',
    'admin_head_styles',
    'admin_bottom_styles',
    'admin_head_scripts',
    'admin_bottom_scripts',
    'editor_head_styles',
    'editor_bottom_styles',
    'editor_head_scripts',
    'editor_bottom_scripts',
    'customizer_head_styles',
    'customizer_bottom_styles',
    'customizer_head_scripts',
    'customizer_bottom_scripts',
    'robot_head_styles',
    'robot_bottom_styles',
    'robot_head_scripts',
    'robot_bottom_scripts ',
  ]

  private plugin_main_file_content: string | null = null
  private plugin_meta_data: any = null


  public clearMetadata() {
    this.plugin_meta_data = null
    this.plugin_main_file_content = null
  }

  public name: string
  public title: string
  public tags: string
  public logo: string
  public enabled: boolean
  public description: string
  public version: string
  public check_version_url: string
  public update_url: string

  constructor({name}: { name: string }) {
    this.name = name
    this.title = this.getTitleAttribute
    this.tags = this.getTagsAttribute
    this.logo = this.getLogoAttribute
    this.enabled = this.getEnabledAttribute
    this.description = this.getDescriptionAttribute
    this.version = this.getVersionAttribute
    this.check_version_url = this.getCheckVersionUrlAttribute
    this.update_url = this.getUpdateUrlAttribute
  }

  public static async switchEnable(pluginName: string, enable: boolean) {
    if (!pluginName) {
      return
    }
    let enabledPlugins = env(Plugin.ALTRP_PLUGINS)
    if (!enabledPlugins) {
      enabledPlugins = []
    } else {
      enabledPlugins = enabledPlugins.split(',')
    }
    const plugin = new Plugin({name: pluginName})

    if (enable) {
      //await plugin.updatePluginSettings()
      if (enabledPlugins.indexOf(plugin.name) === -1) {
        enabledPlugins.push(plugin.name)
      }
    } else {
      enabledPlugins = enabledPlugins.filter((_plugin) => {
        return _plugin != plugin.name
      })
      //plugin.removeStaticsFromAltrpMeta()
    }
    enabledPlugins = enabledPlugins.join(',')
    envWriter([
      {
        key: Plugin.ALTRP_PLUGINS,
        value: enabledPlugins.length === 0 ? '' : enabledPlugins,
      }
    ]);

    //updateDotenv({[Plugin.ALTRP_PLUGINS]: enabledPlugins})
    // Artisan.call('cache:clear')todo: сбросить кэш для данных из .env
    //Plugin.updateAltrpPluginLists()
  }

  /**
   * Удалить списки виджетов и пр. для активных плагинов из .env
   */
  static async updateAltrpPluginLists() {
    let plugins = await Plugin.getEnabledPlugins()
    let new_widget_list: any = []
    plugins.forEach((plugin) => {
        try {
          if (plugin.getMeta(Plugin.PLUGIN_WIDGETS)) {
            new_widget_list = _.concat(new_widget_list, plugin.getMeta(Plugin.PLUGIN_WIDGETS).split(','))
          }
        } catch (e) {
        }
      }
    )
    new_widget_list = new_widget_list.join(',')
    //await updateDotenv({[Plugin.ALTRP_PLUGINS_WIDGET_LIST]: new_widget_list})
    envWriter([
      {
        key: Plugin.ALTRP_PLUGINS_WIDGET_LIST,
        value: new_widget_list.length === 0 ? '' : new_widget_list,
      }
    ]);

  }

  static async getEnabledPlugins(): Promise<Plugin[]> {
    let enabledPlugins: any[]
    if (env(Plugin.ALTRP_PLUGINS)) {
      enabledPlugins = env(Plugin.ALTRP_PLUGINS).split(',')
    } else {
      enabledPlugins = []
    }
    enabledPlugins = enabledPlugins.map(function (plugin_name) {
      return new Plugin({
        name: plugin_name
      })
    })
    enabledPlugins = _.uniqBy(enabledPlugins, (plugin) => {
      return plugin.name
    })
    //await updateDotenv({[Plugin.ALTRP_PLUGINS]: enabledPlugins.map(plugin => plugin.name).join(',')})
    return enabledPlugins
  }

  public copyStaticFiles() {
    let publicPath = this.getPath('/public')
    fs.copySync(publicPath, this.getPublicPath('/public'))
  }

  public deleteStaticFiles() {
    if (fs.existsSync(this.getPublicPath())) {
      fs.removeSync(this.getPublicPath())
    }
  }

  public deletePluginFiles() {
    if (fs.existsSync(this.getPath())) {
      fs.removeSync(this.getPath())
    }
  }

  public async deletePlugin() {
    await Plugin.switchEnable(this.name, false)
    this.deleteStaticFiles()
    this.deletePluginFiles()
  }

  public get getTitleAttribute() {
    return this.getMeta('title')
  }

  public get getCheckVersionUrlAttribute() {
    return this.getMeta('check_version_url')
  }

  public get getUpdateUrlAttribute() {
    return this.getMeta('update_url')
  }

  public get getVersionAttribute() {
    return this.getMeta('version')
  }

  //public get logo(): string {
  public get getLogoAttribute(): string {
    return '/altrp-plugins/' + this.name + this.getMeta('logo', '/public/logo.png')
  }

  public get getDescriptionAttribute() {
    return this.getMeta('description', '')
  }

  public get getTagsAttribute() {
    let tags = this.getMeta('tags', '')
    if (!tags) {
      return []
    }
    tags = tags.split(',')
    tags = tags.map((tag) => {
      return tag.trim()
    })
    return tags
  }

  public getPath(path = ''): string {
    if (!this.name) {
      throw  new NotFoundException('Plugin Name not Found', 404, NotFoundException.code)
    }
    return app_path('AltrpPlugins/' + this.name + path)
  }

  public getPublicPath(path = ''): string {
    if (!this.name) {
      throw new NotFoundException('Plugin Name not Found', 404, NotFoundException.code)
    }
    return public_path('altrp-plugins/' + this.name + path)
  }


  private getMeta(meta_name, _default: any = null) {
    if (!fs.existsSync(this.getPath())) {
      throw new NotFoundException('Plugin not Found', 404, NotFoundException.code)
    }
    if (is_null(this.plugin_meta_data)) {
      this.plugin_meta_data = []
      this.plugin_main_file_content = fs.readFileSync(this.getPath('/plugin_meta'), {encoding: 'utf8'})

      for (let item of this.plugin_main_file_content.split('\n')) {
        let _item = item.split('=')
        if (_item[0]?.trim() && _item[1]?.trim()) {
          this.plugin_meta_data[_item[0]?.trim()] = _item[1]?.trim()
        }
      }
    }

    return data_get(this.plugin_meta_data, meta_name, _default)
  }

  /**
   * @return bool
   */
  public get getEnabledAttribute(): boolean {
    return Plugin.pluginEnabled(this.name)
  }

  public static pluginEnabled(pluginName = ''): boolean {
    if (!pluginName) {
      return false
    }
    // Artisan.call('cache:clear')todo: сбросить кэш
    let enabledPlugins = env(Plugin.ALTRP_PLUGINS)

    if (!enabledPlugins) {
      return false
    }
    enabledPlugins = enabledPlugins.split(',')
    return enabledPlugins.indexOf(pluginName) !== -1
  }

  public async updatePluginSettings() {
    this.copyStaticFiles()
    await this.writeStaticsToAltrpMeta()
  }

  public async removeStaticsFromAltrpMeta() {

    let altrp_static_meta = await AltrpMeta.find(Plugin.ALTRP_STATIC_META)
    if (!altrp_static_meta) {
      altrp_static_meta = new AltrpMeta()
      altrp_static_meta.fill(
        {
          meta_name: Plugin.ALTRP_STATIC_META,
          meta_value: '{}',
        })
      await altrp_static_meta.save()
    }
    let value = JSON.parse(altrp_static_meta.meta_value)

    for (let item of Plugin.STATIC_LOCATIONS_LIST) {
      data_set(value, item + '.' + this.name, null)
    }
    altrp_static_meta.meta_value = JSON.stringify(value)
    altrp_static_meta.save()
    await Plugin.writePluginsSettings()
  }

  static async writePluginsSettings() {

    let altrp_static_meta = await AltrpMeta.find(Plugin.ALTRP_STATIC_META)

    if (!altrp_static_meta) {
      altrp_static_meta = new AltrpMeta()
      altrp_static_meta.fill(
        {
          meta_name: Plugin.ALTRP_STATIC_META,
          meta_value: '{}',
        })
      await altrp_static_meta.save()
    }
    let value = JSON.parse(altrp_static_meta.meta_value)

    for (let item of Plugin.STATIC_LOCATIONS_LIST) {
      let statics_list: any = data_get(value, item)
      let statics_string: any = []
      if (is_array(statics_list)) {
        for (let static_url of statics_list) {
          if (_.isString(static_url) && static_url) {
            statics_string.push(static_url.trim())
          }
        }
      }
      if (statics_string) {
        statics_string = statics_string.join(',')
        await updateDotenv({[item.toUpperCase()]: statics_string})
      } else {
        await updateDotenv({[item.toUpperCase()]: ''})
      }
    }
  }

  async writeStaticsToAltrpMeta() {
    let altrp_static_meta = await AltrpMeta.find(Plugin.ALTRP_STATIC_META)

    if (!altrp_static_meta) {
      altrp_static_meta = new AltrpMeta()
      altrp_static_meta.fill(
        {
          meta_name: Plugin.ALTRP_STATIC_META,
          meta_value: '{}',
        })
      await altrp_static_meta.save()
    }
    let value = JSON.parse(altrp_static_meta.meta_value)

    for (let item of Plugin.STATIC_LOCATIONS_LIST) {
      data_set(value, item + '.' + this.name, this.getMeta(item)
      )
    }
    altrp_static_meta.meta_value = JSON.stringify(value)
    altrp_static_meta.save()
    await Plugin.writePluginsSettings()
  }

  static public


  public async updatePluginFiles(request: RequestContract): Promise<boolean> {
    if (!isValidUrl(this.update_url)) {
      return true
    }
    let res
    try {
      res =  await httpsRequest(this.update_url, {
        'headers':
          {
            'authorization': request.cookie('altrpMarketApiToken'),
            // @ts-ignore
            'altrp-domain-resource': request.hostname(),
          }
      })
    } catch (e) {
      Logger.error(e.getMessage() + '\n' + e.stack)
      return false
    }
    if (!res) {
      return false
    }
    let temp_path = storage_path('temp')
    fs.ensureDirSync(temp_path)
    let filename = temp_path + '/' + this.name + '.zip'
    fs.writeFileSync(filename, res)
    let archive = new AdmZip(filename)

    archive.extractAllTo(this.getPath())

    fs.removeSync(temp_path)
    return true
  }


  /**
   * @return Collection
   */
  static getPlugins(): [] {
    let plugins
    if (fs.existsSync(app_path('AltrpPlugins'))) {
      plugins = fs.readdirSync(app_path('AltrpPlugins'))
    } else {
      plugins = []
    }
    return plugins
  }

  static async getDownloadedPluginsList() {
    let plugins
    if (fs.existsSync(app_path('AltrpPlugins'))) {
      plugins = fs.readdirSync(app_path('AltrpPlugins'));

    } else {
      plugins = [];
    }
    for (let key in plugins) {
      if (plugins.hasOwnProperty(key)) {

        let plugin = plugins[key]
        plugins[key] = path.basename(plugin);
      }
    }
    return plugins.map(function (plugin) {
      return new Plugin({'name': plugin})
    })
  }
}
