import {parse} from 'node-html-parser'
import fs from 'fs'
import BaseGenerator from './BaseGenerator';
import Application from '@ioc:Adonis/Core/Application';
import app_path from '../../helpers/path/app_path';
import Template from 'App/Models/Template';
import path from 'path';
import * as _ from 'lodash'
import ListenerGenerator from "App/Generators/ListenerGenerator";
import SCREENS from "../../helpers/const/SCREENS";
import escapeRegExp from "../../helpers/escapeRegExp";
import clearRequireCache from "../../helpers/node-js/clearRequireCache";
import DEFAULT_BREAKPOINT from "../../helpers/const/DEFAULT_BREAKPOINT";
import { optimizeStyles } from '../../helpers/screen'
export default class TemplateGenerator extends BaseGenerator {

  public static directory = '/views/altrp/templates'
  public static screensDirectory = '/altrp/html/screens'
  public static template = app_path(`altrp-templates/views/Template.stub`)
  public template: Template;


  deleteFile(template: Template): void {
    if (fs.existsSync(path.join(this.getDirectory(template), this.getFilename(template)))) {
      fs.rmSync(path.join(this.getDirectory(template), this.getFilename(template)));
    }
  }

  deleteFiles(template: Template): void {
    for (const screen of SCREENS) {
      if (fs.existsSync(path.join(this.getDirectory(template, screen.name), this.getFilename(template)))) {
        fs.rmSync(path.join(this.getDirectory(template, screen.name), this.getFilename(template)));
      }
    }
  }

  getDirectory(template: Template, screenName = '') {
    if (!screenName) {
      return Application.resourcesPath(`${TemplateGenerator.directory}/${template.currentArea?.name}`)
    }
    return Application.publicPath(`${TemplateGenerator.screensDirectory}/${screenName}/templates/${template.currentArea?.name}`)
  }

  getFilename(template: Template): string {
    return template.guid + '.edge'
  }

  async run(template: Template, templateStyles?: Record<string, string[]>): Promise<void> {
    if (!template) {
      return
    }
    if (template.type !== 'template') {
      return
    }
    await template.load('currentArea')

    this.template = template
    const styles = templateStyles ?? JSON.parse(template.styles || "{}")
    let all_styles = _.get(styles, 'all_styles', [])
    all_styles = all_styles.join('')
    all_styles = parse(all_styles)
    let queriedStyles = ''
    for (const screen of SCREENS) {
      await ListenerGenerator.getHookTemplates(this)
      if (template.guid) {
        let currentScreenStyles = _.get(styles, screen.name, [])
        if (currentScreenStyles.length) {
          if(screen.name === DEFAULT_BREAKPOINT){
            queriedStyles += currentScreenStyles.join('')
          } else{
            queriedStyles += `${screen.fullMediaQuery}{${currentScreenStyles.join('')}}`
          }
        } else {
           await BaseGenerator.generateCssFile(template.guid, all_styles.textContent, screen.name)
        }

      }

      if (!template.currentArea?.name) {
        console.error(`Template ${template.id} render error. Need Area name`);
        return
      }
      if (!template.guid) {
        console.error(`Template ${template.id} render error. Need guid`);
        return
      }

      if(template.currentArea.name === 'card'){
        // @ts-ignore
        const children_content = await template.getChildrenContent(screen.name)
        const fileName = `${template.guid}.html`

        await this.addFile(fileName)
          .destinationDir(this.getDirectory(template, screen.name))
          .stub(TemplateGenerator.template)
          .apply({
            children_content,
            all_styles: '',
            screen_name: screen.name,
            area_name: template.currentArea?.name,
          })
      }
    }

    const _styles: string[] = []
    const optimizedStyles = await optimizeStyles(queriedStyles)

    optimizedStyles.forEach(([mediaQuery, queryStyles]: string[]) => {
      mediaQuery ? _styles.push(`${mediaQuery}{${queryStyles}}`) : _styles.push(queryStyles)
    })

    queriedStyles = _styles.join('')

    if (template.guid) {
      for (const screen of SCREENS) {
        queriedStyles && await BaseGenerator.generateCssFile(template.guid, queriedStyles, screen.name)
      }
    }
    clearRequireCache()

  }

  static async prepareContent(content: string): Promise<string> {

    let paths = _.isString(content) ? content.match(/{{([\s\S]+?)(?=}})/g) : null;
    if (_.isArray(paths)) {
      // @ts-ignore
      paths.forEach(path => {
        path = path.replace("{{", "");
        if (path.indexOf('(') !== -1) {
          return
        }
        let replace = path + "|| ''";
        replace = replace.replace(/\./g, '?.')
        replace = `{{{${replace}}}}`
        path = escapeRegExp(path);
        content = content.replace(new RegExp(`{{${path}}}`, "g"), replace);
      });
    }

    return content
  }
}
