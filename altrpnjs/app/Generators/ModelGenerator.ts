import {BaseCommand} from '@adonisjs/core/build/standalone'
import Model from "App/Models/Model";
import app_path from "../../helpers/app_path";
import base_path from "../../helpers/base_path";
import Column from "App/Models/Column";
import Table from "App/Models/Table";
import Relationship from "App/Models/Relationship";
import fs from 'fs'

export default class ModelGenerator extends BaseCommand {

  private static directory = app_path('/Models/AltrpModels/')
  private static template = base_path('/altrp-templates/AltrpModel')
  private model: Model
  private table: Table
  private altrp_relationships: Relationship[] = []
  private columns: Column[] = []

  public async run(model: Model) {

    model.save()

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
    let fileName = model.name
    if (!fileName) {
      return
    }
    if (fs.existsSync(ModelGenerator.directory + fileName)) {
      let oldContent:string = fs.readFileSync(ModelGenerator.directory + fileName,  {encoding: 'utf8'})
      if(oldContent){
        custom = oldContent.match(/\/\/ CUSTOM_START(.*)\/\/ CUSTOM_START/)?.pop() || ''
        custom = custom.trim()
      }

    }
    this.generator
      .addFile(fileName)
      .appRoot(this.application.appRoot)
      .destinationDir(ModelGenerator.directory)
      .useMustache()
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
`
  }

  private getClassnameContent(): string {
    return ` ${this.model.name} `
  }

  private getPropertiesContent(): string {
    return ``
  }

  private getColumnsContent(): string {
    let columns = this.columns.filter(column => column.type !== 'calculated')
    return `
${columns.map(column => column.renderForModel())}
`
  }

  private getMethodsContent(): string {
    return ''
  }

  private getComputedContent(): string {
    let columns = this.columns.filter(column => column.type === 'calculated')
    return `
${columns.map(column => column.renderForModel())}
    `
  }

  private getRelationsContent(): string {
    return `
${this.altrp_relationships.map(relationship => relationship.renderForModel())}
    `
  }


}
