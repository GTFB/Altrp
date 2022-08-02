import app_path from '../../helpers/path/app_path';
import fs from 'fs';
import { BaseGenerator } from 'App/Generators/BaseGenerator';
import Controller from 'App/Models/Controller';
import Source from 'App/Models/Source';
import Model from 'App/Models/Model';
import ModelGenerator from 'App/Generators/ModelGenerator';
import Customizer from 'App/Models/Customizer';
import SQLEditor from 'App/Models/SQLEditor';
import isProd from '../../helpers/isProd';
import ListenerGenerator from 'App/Generators/ListenerGenerator';

export default class ControllerGenerator extends BaseGenerator {
  public static directory = app_path('/AltrpControllers/');
  private static template = app_path(
    `/altrp-templates/${isProd() ? 'prod' : 'dev'}/AltrpController.stub`
  );
  private controller: Controller;
  private model: Model;
  private sources: Source[] = [];

  public async run(controller: Controller): Promise<void> {
    if (!controller) {
      return;
    }
    await controller.load((loader) => {
      loader.load('sources', (loader) => {
        loader.preload('roles');
        loader.preload('altrp_model', (loader) => {
          loader.preload('table', (loader) => {
            loader.preload('columns');
          });
        });
        loader.preload('model');
        loader.preload('permissions');
      });
      loader.load('altrp_model', (loader) => {
        loader.preload('table', (loader) => {
          loader.preload('columns');
        });
      });
    });

    let custom = '';
    let custom_end = '';

    this.controller = controller;
    this.model = this.controller.altrp_model;

    this.sources = this.controller.sources;
    /**
     * Асинхронно подгружаем связи для ресурсов
     */
    this.sources = await Promise.all(
      this.sources.map(async (s: Source) => {
        await s.load('model', (model) => {
          model.preload('table');
        });
        await s.load('altrp_model', (model) => {
          model.preload('table', (loader) => {
            loader.preload('columns');
          });
        });
        if (s.sourceable_id) {
          switch (s.sourceable_type) {
            case Customizer.sourceable_type:
              {
                s.customizer = await Customizer.find(s.sourceable_id);
                if (s.customizer) {
                  await s.customizer.load('source');
                }
              }
              break;
            case SQLEditor.sourceable_type:
              {
                s.sQLEditor = await SQLEditor.find(s.sourceable_id);
                if (s.sQLEditor) {
                  await s.sQLEditor.load('source');
                }
              }
              break;
          }
        }
        return s;
      })
    );

    let fileName = `${this.model.name}Controller${ModelGenerator.ext}`;
    if (!this.getClassnameContent()) {
      return;
    }
    if (fs.existsSync(ControllerGenerator.directory + fileName)) {
      let oldContent: string = fs.readFileSync(ControllerGenerator.directory + fileName, {
        encoding: 'utf8',
      });
      if (oldContent) {
        custom = oldContent.match(/\/\/ CUSTOM_START([\s\S]+?)\/\/ CUSTOM_START/)?.pop() || '';
        custom = custom.trim();
        custom_end = oldContent.match(/\/\/ CUSTOM_END([\s\S]+?)\/\/ CUSTOM_END/)?.pop() || '';
        custom_end = custom_end.trim();
      }
    }

    ListenerGenerator.getHookControllers(this);

    return await this.addFile(fileName)
      .destinationDir(ControllerGenerator.directory)
      .stub(ControllerGenerator.template)
      .apply({
        imports: this.getImportsContent(),
        classname: this.getClassnameContent(),
        properties: this.getPropertiesContent(),
        methods: await this.getMethodsContent(this.model.name),
        custom,
        custom_end,
      });
  }

  private getImportsContent(): string {
    return isProd() ? this._getProdImportsContent() : this._getDevImportsContent();
  }

  private getClassnameContent(): string {
    return ` ${this.model.name}Controller `;
  }

  private getPropertiesContent(): string {
    return '';
  }

  private async getMethodsContent(modelClassName: string): Promise<string> {
    const customizers = await Customizer.query()
      .where('type', 'method')
      .whereHas('altrp_model', (altrpModelQuery) => {
        altrpModelQuery.where('name', modelClassName);
      });

    return `
    ${customizers.map((customizer) => customizer.renderForController(modelClassName)).join('')}
    ${this.sources.map((source) => source.renderForController(modelClassName)).join('')}
    `;
  }

  private _getProdImportsContent() {
    return `
const ${this.model.name} = require('../AltrpModels/${this.model.name}').default
const AltrpBaseController = require('../Controllers/AltrpBaseController').default
    `;
  }

  private _getDevImportsContent(): string {
    return `
import ${this.model.name} from "../AltrpModels/${this.model.name}";
import AltrpBaseController from "../Controllers/AltrpBaseController";
`;
  }
}
