import Model from "App/Models/Model";
import app_path from "../../helpers/path/app_path";
import Column from "App/Models/Column";
import Table from "App/Models/Table";
import Relationship from "App/Models/Relationship";
import fs from 'fs'
import BaseGenerator from "./BaseGenerator";
import * as _ from "lodash";
import ControllerGenerator from "./ControllerGenerator";
import isProd from "../../helpers/isProd";
import ListenerGenerator from "App/Generators/ListenerGenerator";
import clearRequireCache from "../../helpers/node-js/clearRequireCache";
import Customizer from "App/Models/Customizer";

export default class ModelGenerator extends BaseGenerator {

  public static directory = app_path('/AltrpModels/')
  public static template = app_path(`/altrp-templates/${isProd() ? 'prod' : 'dev'}/AltrpModel.stub`)
  public static ext = isProd() ? '.js': '.ts'
  private model: Model
  private table: Table
  private altrp_relationships: Relationship[] = []
  private columns: Column[] = []


  public async deleteFiles(model: Model): Promise<void> {
    let fileName = this.getFilename(model)
    if (fs.existsSync(ModelGenerator.directory + fileName)) {
      fs.rmSync(ModelGenerator.directory + fileName);
    }
    fileName =`${model.name}Controller${ModelGenerator.ext}`
    if (fs.existsSync(ControllerGenerator.directory + fileName)) {
      fs.rmSync(ControllerGenerator.directory + fileName);
    }
    return
  }
  getFilename(model):string{
    let fileName = model.name + ModelGenerator.ext
    return fileName
  }
  public async run(model: Model) {
    if(! model){
      return
    }
    await model.load((loader) => {
      loader.load('table', (table) => {
        table.preload('columns', column=>{
          column.preload('altrp_model')
        })
      })
      loader.load('altrp_relationships', relation => {
        relation.preload('altrp_target_model')
        relation.preload('altrp_model')
      })
    })

    let custom = ''
    let custom_end = ''


    this.model = model
    this.table = model.table
    this.altrp_relationships = model.altrp_relationships
    this.columns = this.table.columns
    let fileName = this.getFilename(model)
    if (!model.name) {
      return
    }
    if (fs.existsSync(ModelGenerator.directory + fileName)) {
      let oldContent:string = fs.readFileSync(ModelGenerator.directory + fileName,  {encoding: 'utf8'})
      if(oldContent){
        custom = oldContent.match(/\/\/ CUSTOM_START([\s\S]+?)\/\/ CUSTOM_START/)?.pop() || ''
        custom = custom.trim()
        custom_end = oldContent.match(/\/\/ CUSTOM_END([\s\S]+?)\/\/ CUSTOM_END/)?.pop() || ''
        custom_end = custom_end.trim()
      }


    }

    ListenerGenerator.getHookModels(this)

    await this.addFile(fileName)
      .destinationDir(ModelGenerator.directory)
      .stub(ModelGenerator.template)
      .apply({
        imports: this.getImportsContent(),
        classname: this.getClassnameContent(),
        properties: this.getPropertiesContent(),
        staticProperties: isProd() ? this.getProdStaticPropertiesContent() : '',
        columns: this.getColumnsContent(),
        computed: this.getComputedContent(),
        relations: await this.getRelationsContent(),
        methods: await this.getMethodsContent(),
        constructor: this.getConstructorContent(),
        custom,
        custom_end,
      })

    clearRequireCache()
  }

  private getImportsContent(): string {
    return isProd() ? this._getProdImportsContent() : this._getDevImportsContent()
  }
  private _getProdImportsContent(): string {
    return `

const Event =__importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Event"));
${this.model.soft_deletes ? `
const delete_1 = require("../../helpers/delete");
` : ''}
${_.uniqBy(
  this.altrp_relationships
      .filter(relationship => relationship?.altrp_target_model?.name),
      relationship => relationship.altrp_target_model.name
    ).map(relationship =>
        `const ${relationship?.altrp_target_model?.name} = require('./${relationship?.altrp_target_model?.name}');`)
      .join('\n')
    }
`
  }
  private _getDevImportsContent(): string {
    return `import * as luxon from 'luxon'
import * as Orm from '@ioc:Adonis/Lucid/Orm'
import Event from '@ioc:Adonis/Core/Event'
${_.uniqBy(
  this.altrp_relationships
      .filter(relationship => relationship?.altrp_target_model?.name),
      relationship => relationship.altrp_target_model.name
    ).map(relationship =>
        `import ${relationship?.altrp_target_model?.name} from './${relationship?.altrp_target_model?.name}'`)
      .join('\n')
    }
${this.model.soft_deletes ? `
import {softDeleteQuery, softDelete} from "../../helpers/delete";
` : ''}
`
  }

  private getClassnameContent(): string {
    return `${this.model.name}`
  }

  private getPropertiesContent(): string {
    return isProd() ?  this._getProdPropertiesContent() : this._getDevPropertiesContent()
  }

  private _getProdPropertiesContent(): string {

    const {settings = {}} = this.model

    const {static_props = []} = settings
    return `
  ${static_props.map(({
   // @ts-ignore
   prop_value,
   // @ts-ignore
   prop_name,})=>{
        if(!prop_name || !prop_value){
          return ''
        }
        return `
  static get ${prop_name}(){
    return \`${prop_value}\`
  }`
      }
    ).join('\n')}

    `
  }

  private _getDevPropertiesContent(): string {
    const {settings = {}} = this.model

    const {static_props = []} = settings


    return `
  public static table = '${this.table.name}'
  ${static_props.map(({
       // @ts-ignore
        prop_value,
     // @ts-ignore
        prop_name,
    })=>{
      if(!prop_name || !prop_value){
          return ''
        }
        return `
  static get ${prop_name}(){
    return \`${prop_value}\`
  }`
      }
    ).join('\n')}

    `
  }

  private getColumnsContent(): string {
    return isProd() ? this._getProdColumnsContent() : this._getDevColumnsContent()
  }

  private _getProdColumnsContent(): string {
    let columns = this.columns.filter(column => column.type !== 'calculated')
    return `
decorate([
  (0, Orm.column)({ isPrimary: true }),
  metadata("design:type", Number)
], ${this.model.name}.prototype, "id", void 0);
${columns.map(column => column.altrp_model ? column.renderProdForModel() : '').join('')}
${this.model.soft_deletes ? `
decorate([
    (0, Orm.beforeFind)(),
    __metadata("design:type", Object)
], ${this.model.name}, "softDeletesFind", void 0);
decorate([
    (0, Orm.beforeFetch)(),
    __metadata("design:type", Object)
], ${this.model.name}, "softDeletesFetch", void 0);
decorate([
    (0, Orm.beforePaginate)(),
    __metadata("design:type", Object)
], ${this.model.name}, "softDeletesFetch", void 0);
` : ''}
`
  }

  private _getDevColumnsContent(): string {
    let columns = this.columns.filter(column => column.type !== 'calculated')
    return `
  @Orm.column({ isPrimary: true })
  public id: number
${columns.map(column => column.renderForModel()).join('')}
`
  }

  private async getMethodsContent(): Promise<string> {

    const customizerQuery = Customizer.query()

    customizerQuery.where('model_guid', this.model.guid)
    customizerQuery.where('type', 'method')

    const methods = await customizerQuery

    let methodsContent = ''

    for(const method of methods){
      try{
        const startNode = method.getStartNode()

        if(! startNode){
          continue
        }
        let _static = startNode.isStaticMethod() ? ' static ' : ''
        let _async = startNode.isAsyncMethod() ? ' async ' : ''
        let params = startNode.getMethodParams()
        let methodContent = `
/**
 * Automatically generated class method
 */
${_static}${_async} ${method.name}(${params.join(', ')}){
  ${startNode.getJSContent()}
          }
`
        methodsContent +=  methodContent
      }catch (e) {
        console.error('Error While Render Method-Customizer', e)
      }
    }
    if(this.model.soft_deletes && ! isProd()){
      return `
  @Orm.beforeFind()
  public static softDeletesFind = softDeleteQuery;

  @Orm.beforeFetch()
  public static softDeletesFetch = softDeleteQuery;

  @Orm.beforePaginate()
  public static softDeletesFetch = softDeleteQuery;


  public delete = async ()=>{
    await softDelete(this)
  }


  public forceDelete = async ()=>{

    try {
      await super.delete()

      return true
    } catch (e) {
      console.error(e)

      return false
    }
  }
${methodsContent}`
    }
    return methodsContent
  }

  private getComputedContent(): string {
    let columns = this.columns.filter(column => column.type === 'calculated')
    return `
${columns.map(column => column.renderForModel()).join('')}
    `
  }

  private async getRelationsContent(): Promise<string> {
    let content = ``
    for(const relation of this.altrp_relationships){
      content += await relation.renderForModel()
    }

    return content
  }


  private getProdStaticPropertiesContent() {
    return `
${this.model.name}.table = '${this.table.name}';
${this.model.soft_deletes ? `
${this.model.name}.softDeletesFind = delete_1.softDeleteQuery;
${this.model.name}.softDeletesFetch = delete_1.softDeleteQuery;
` : ''}
`;
  }

  private getConstructorContent(): string {
    if(this.model.soft_deletes){
      return`
  constructor() {
    super(...arguments);
    this.delete = async () => {
        await (0, delete_1.softDelete)(this);
    };
    this.forceDelete = async () => {
      try {
        await super.delete();
        return true;
      }
      catch (e) {
        console.error(e);
        return false;
      }
    };
  }
      `
    }
    return  ''
  }
}
