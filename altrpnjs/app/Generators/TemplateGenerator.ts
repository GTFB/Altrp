import { parse } from 'node-html-parser';
import fs from 'fs';
import { BaseGenerator } from './BaseGenerator';
import Application from '@ioc:Adonis/Core/Application';
import app_path from '../../helpers/path/app_path';
import Template from 'App/Models/Template';
import path from 'path';
import * as _ from 'lodash';
import Logger from '@ioc:Adonis/Core/Logger';
import ListenerGenerator from 'App/Generators/ListenerGenerator';

export default class TemplateGenerator extends BaseGenerator {
  public static directory = '/views/altrp/templates';
  public static template = app_path(`altrp-templates/views/Template.stub`);
  public template: Template;

  async deleteFile(template: Template): Promise<void> {
    if (fs.existsSync(path.join(this.getDirectory(template), this.getFilename(template)))) {
      fs.rmSync(path.join(this.getDirectory(template), this.getFilename(template)));
    }
  }

  getDirectory(template: Template) {
    return Application.resourcesPath(
      `${TemplateGenerator.directory}/${template.currentArea?.name}`
    );
  }

  getFilename(template: Template): string {
    return template.guid + '.edge';
  }

  async run(template: Template) {
    if (!template) {
      return;
    }
    if (template.type !== 'template') {
      return;
    }
    await template.load('currentArea');

    this.template = template;

    ListenerGenerator.getHookTemplates(this);

    const styles = JSON.parse(template.styles || '{}');

    let all_styles = _.get(styles, 'all_styles', []);
    //
    all_styles = all_styles.join('');
    all_styles = parse(all_styles);
    if (template.guid) {
      await BaseGenerator.generateCssFile(template.guid, all_styles.textContent);
    }
    let fileName = this.getFilename(template);
    if (!template.currentArea?.name) {
      console.error(`Template ${template.id} render error. Need Area name`);
      Logger.warn(`Try Render Template without area (id: ${template.id})`);
      return;
    }
    if (!template.guid) {
      console.error(`Template ${template.id} render error. Need guid`);
      Logger.warn(`Try Render Template without guid (id: ${template.id})`);
      return;
    }
    let children_content = await template.getChildrenContent();

    return await this.addFile(fileName)
      .destinationDir(this.getDirectory(template))
      .stub(TemplateGenerator.template)
      .apply({
        children_content,
        all_styles: '',
        area_name: template.currentArea?.name,
      });
  }
}
