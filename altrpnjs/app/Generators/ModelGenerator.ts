import Model from 'App/Models/Model';
import app_path from '../../helpers/path/app_path';
import Column from 'App/Models/Column';
import Table from 'App/Models/Table';
import Relationship from 'App/Models/Relationship';
import fs from 'fs';
import { BaseGenerator } from './BaseGenerator';
import * as _ from 'lodash';
import ControllerGenerator from './ControllerGenerator';
import isProd from '../../helpers/isProd';
import ListenerGenerator from 'App/Generators/ListenerGenerator';

export default class ModelGenerator extends BaseGenerator {
  public static directory = app_path('/AltrpModels/');
  public static template = app_path(
    `/altrp-templates/${isProd() ? 'prod' : 'dev'}/AltrpModel.stub`
  );
  public static ext = isProd() ? '.js' : '.ts';
  private model: Model;
  private table: Table;
  private altrp_relationships: Relationship[] = [];
  private columns: Column[] = [];

  public async deleteFiles(model: Model): Promise<void> {
    let fileName = this.getFilename(model);
    if (fs.existsSync(ModelGenerator.directory + fileName)) {
      fs.rmSync(ModelGenerator.directory + fileName);
    }
    fileName = `${model.name}Controller${ModelGenerator.ext}`;
    if (fs.existsSync(ControllerGenerator.directory + fileName)) {
      fs.rmSync(ControllerGenerator.directory + fileName);
    }
    return;
  }
  getFilename(model): string {
    let fileName = model.name + ModelGenerator.ext;
    return fileName;
  }
  public async run(model: Model) {
    if (!model) {
      return;
    }
    await model.load((loader) => {
      loader.load('table', (table) => {
        table.preload('columns', (column) => {
          column.preload('altrp_model');
        });
      });
      loader.load('altrp_relationships', (relation) => {
        relation.preload('altrp_target_model');
        relation.preload('altrp_model');
      });
    });

    let custom = '';
    let custom_end = '';

    this.model = model;
    this.table = model.table;
    this.altrp_relationships = model.altrp_relationships;
    this.columns = this.table.columns;
    let fileName = this.getFilename(model);
    if (!model.name) {
      return;
    }
    if (fs.existsSync(ModelGenerator.directory + fileName)) {
      let oldContent: string = fs.readFileSync(ModelGenerator.directory + fileName, {
        encoding: 'utf8',
      });
      if (oldContent) {
        custom = oldContent.match(/\/\/ CUSTOM_START([\s\S]+?)\/\/ CUSTOM_START/)?.pop() || '';
        custom = custom.trim();
        custom_end = oldContent.match(/\/\/ CUSTOM_END([\s\S]+?)\/\/ CUSTOM_END/)?.pop() || '';
        custom_end = custom_end.trim();
      }
    }

    ListenerGenerator.getHookModels(this);

    return await this.addFile(fileName)
      .destinationDir(ModelGenerator.directory)
      .stub(ModelGenerator.template)
      .apply({
        imports: this.getImportsContent(),
        classname: this.getClassnameContent(),
        properties: this.getPropertiesContent(),
        staticProperties: isProd() ? this.getProdStaticPropertiesContent() : '',
        columns: this.getColumnsContent(),
        computed: this.getComputedContent(),
        relations: this.getRelationsContent(),
        methods: this.getMethodsContent(),
        custom,
        custom_end,
      });
  }

  private getImportsContent(): string {
    return isProd() ? this._getProdImportsContent() : this._getDevImportsContent();
  }
  private _getProdImportsContent(): string {
    return `
    const Event =__importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Event"));

${_.uniqBy(
  this.altrp_relationships.filter((relationship) => relationship?.altrp_target_model?.name),
  (relationship) => relationship.altrp_target_model.name
)
  .map(
    (relationship) =>
      `const ${relationship?.altrp_target_model?.name} = require('./${relationship?.altrp_target_model?.name}');`
  )
  .join('\n')}
`;
  }
  private _getDevImportsContent(): string {
    return `import * as luxon from 'luxon'
import * as Orm from '@ioc:Adonis/Lucid/Orm'
import Event from '@ioc:Adonis/Core/Event'
import { softDelete, forceDelete } from "../../helpers/delete"
${_.uniqBy(
  this.altrp_relationships.filter((relationship) => relationship?.altrp_target_model?.name),
  (relationship) => relationship.altrp_target_model.name
)
  .map(
    (relationship) =>
      `import ${relationship?.altrp_target_model?.name} from './${relationship?.altrp_target_model?.name}'`
  )
  .join('\n')}
`;
  }

  private getClassnameContent(): string {
    return `${this.model.name}`;
  }

  private getPropertiesContent(): string {
    return isProd() ? this._getProdPropertiesContent() : this._getDevPropertiesContent();
  }

  private _getProdPropertiesContent(): string {
    return ``;
  }

  private _getDevPropertiesContent(): string {
    return `
  public static table = '${this.table.name}'
    `;
  }

  private getColumnsContent(): string {
    return isProd() ? this._getProdColumnsContent() : this._getDevColumnsContent();
  }

  private _getProdColumnsContent(): string {
    let columns = this.columns.filter((column) => column.type !== 'calculated');
    return `
decorate([
  (0, Orm.column)({ isPrimary: true }),
  metadata("design:type", Number)
], ${this.model.name}.prototype, "id", void 0);
${columns.map((column) => (column.altrp_model ? column.renderProdForModel() : '')).join('')}
`;
  }

  private _getDevColumnsContent(): string {
    let columns = this.columns.filter((column) => column.type !== 'calculated');
    return `
  @Orm.column({ isPrimary: true })
  public id: number
${columns.map((column) => column.renderForModel()).join('')}
`;
  }

  private getMethodsContent(): string {
    return '';
  }

  private getComputedContent(): string {
    let columns = this.columns.filter((column) => column.type === 'calculated');
    return `
${columns.map((column) => column.renderForModel()).join('')}
    `;
  }

  private getRelationsContent(): string {
    return `
${this.altrp_relationships.map((relationship) => relationship.renderForModel()).join('')}
    `;
  }

  private getProdStaticPropertiesContent() {
    return `
${this.model.name}.table = '${this.table.name}';
`;
  }
}
