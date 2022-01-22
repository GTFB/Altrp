import Model from "App/Models/Model";
import app_path from "../../helpers/app_path";
import Column from "App/Models/Column";
import Table from "App/Models/Table";
import Relationship from "App/Models/Relationship";
import fs from 'fs'
import {BaseGenerator} from "./BaseGenerator";
import * as _ from "lodash";
import ControllerGenerator from "./ControllerGenerator";

export default class ModelGenerator extends BaseGenerator {

  public static directory = app_path('/AltrpModels/')
  public static template = app_path('/altrp-templates/AltrpModel.stub')
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

    await model.load((loader) => {
      loader.load('table', (table) => {
        table.preload('columns')
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
        columns: this.getColumnsContent(),
        computed: this.getComputedContent(),
        relations: this.getRelationsContent(),
        methods: this.getMethodsContent(),
        custom,
      })

  }

  private getImportsContent(): string {
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
    return `
  public static table = '${this.table.name}'
    `
  }

  private getColumnsContent(): string {
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


}
