import Model from "App/Models/Model";
import app_path from "../../helpers/app_path";
import Column from "App/Models/Column";
import Table from "App/Models/Table";
import Relationship from "App/Models/Relationship";
import fs from 'fs'
import {BaseGenerator} from "./BaseGenerator";
import * as _ from "lodash";
import ControllerGenerator from "./ControllerGenerator";
import isProd from "../../helpers/isProd";

export default class ModelGenerator extends BaseGenerator {

  public static directory = app_path('/AltrpModels/')
  public static template = app_path(`/altrp-templates/${isProd() ? 'prod' : 'dev'}/AltrpModel.stub`)
  public static ext = '.ts'
  private model: Model
  private table: Table
  private altrp_relationships: Relationship[] = []
  private columns: Column[] = []


  public async deleteFiles(model: Model): Promise<void> {
    let fileName = this.getFilename(model)
    if (fs.existsSync(ModelGenerator.directory + fileName)) {
      fs.unlinkSync(ModelGenerator.directory + fileName);
    }
    fileName =`${model.name}Controller${ModelGenerator.ext}`
    if (fs.existsSync(ControllerGenerator.directory + fileName)) {
      fs.unlinkSync(ControllerGenerator.directory + fileName);
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
      })
    })

    let custom = ''


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
      }

    }
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
      })

  }

  private getImportsContent(): string {
    return isProd() ? this._getProdImportsContent() : this._getDevImportsContent()
  }
  private _getProdImportsContent(): string {
    return `
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
${_.uniqBy(
  this.altrp_relationships
      .filter(relationship => relationship?.altrp_target_model?.name),
      relationship => relationship.altrp_target_model.name
    ).map(relationship =>
        `import ${relationship?.altrp_target_model?.name} from './${relationship?.altrp_target_model?.name}'`)
      .join('\n')
    }
`
  }

  private getClassnameContent(): string {
    return ` ${this.model.name} `
  }

  private getPropertiesContent(): string {
    return isProd() ?  this._getProdPropertiesContent() : this._getDevPropertiesContent()
  }

  private _getProdPropertiesContent(): string {
    return ``
  }

  private _getDevPropertiesContent(): string {
    return `
  public static table = '${this.table.name}'
    `
  }

  private getColumnsContent(): string {
    return isProd() ? this._getProdColumnsContent() : this._getDevColumnsContent()
  }

  private _getProdColumnsContent(): string {
    let columns = this.columns.filter(column => column.type !== 'calculated')
    return `
${columns.map(column => column.altrp_model ? column.renderProdForModel() : '').join('')}
`
  }

  private _getDevColumnsContent(): string {
    let columns = this.columns.filter(column => column.type !== 'calculated')
    return `
${columns.map(column => column.renderForModel()).join('')}
`
  }

  private getMethodsContent(): string {
    return ''
  }

  private getComputedContent(): string {
    let columns = this.columns.filter(column => column.type === 'calculated')
    return `
${columns.map(column => column.renderForModel()).join('')}
    `
  }

  private getRelationsContent(): string {
    return `
${this.altrp_relationships.map(relationship => relationship.renderForModel()).join('')}
    `
  }


  private getProdStaticPropertiesContent() {
    return `
${this.model.name}.table = '${this.table.name}';
`;
  }
}
