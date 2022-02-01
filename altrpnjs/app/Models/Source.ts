import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Models/Model';
import Controller from 'App/Models/Controller';
import config from "../../helpers/config";
import { string } from '@ioc:Adonis/Core/Helpers'
import data_get from "../../helpers/data_get";
import Role from "App/Models/Role";
import Permission from "App/Models/Permission";
import Customizer from "App/Models/Customizer";
import SQLEditor from "App/Models/SQLEditor";

export default class Source extends BaseModel {
  public static table = 'altrp_sources'

  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public api_url: string

  @column()
  public type: string

  @column()
  public request_type: string

  @column()
  public name : string

  @column()
  public title: string

  @column()
  public auth: boolean

  @column()
  public model_id: number

  @column()
  public sourceable_id: number

  @column()
  public controller_id: number

  @column()
  public headers: string

  @column()
  public description: string

  @column()
  public sourceable_type: string

  @column()
  public bodies: string

  @column()
  public need_all_roles: boolean


  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public altrp_model: BelongsTo<typeof Model>

  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public model: BelongsTo<typeof Model>

  @manyToMany(() => Role, {
    pivotTable: 'altrp_sources_roles',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'source_id',
    pivotRelatedForeignKey: 'role_id',
  })
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission, {
    pivotTable: 'altrp_sources_permissions',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'permission_id',
    pivotRelatedForeignKey: 'source_id',
  })
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Permission, {
    pivotTable: 'altrp_sources_permissions',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'permission_id',
    pivotRelatedForeignKey: 'source_id',
  })
  public source_permissions: ManyToMany<typeof Permission>

  public customizer: Customizer| null

  public sQLEditor: SQLEditor| null

  private methodBody: string = ''

  @computed()
  public get web_url(){

    switch ( this.sourceable_type ){
      case SQLEditor.sourceable_type:
      case 'App\\Altrp\\Query':
        return config('app.url') + '/ajax/models/queries' + data_get( this, 'url' );
      case 'App\\Altrp\\Customizer':
        return config('app.url') + '/ajax/models/' + string.pluralize(this?.model?.name || '') + '/customizers' + data_get( this, 'url' );
      default:
        return this.type != 'remote'
          ? config('app.url') + '/ajax/models' + data_get( this, 'url' )
      : config('app.url') + '/ajax/models/data_sources/' + this.model.table.name + '/' + data_get( this, 'name' );
    }
  }

  @belongsTo(() => Controller, {
    foreignKey: 'controller_id'
  })
  public controller: BelongsTo<typeof Controller>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  renderForController(modelClassName:string):string {
    this.prepareContent()
    return `
  public async ${this.getMethodName()}(httpContext){
    ${this.renderRolesCheck()}
    ${this.renderPermissionsCheck()}
    ${this.renderMethodBody(modelClassName)}
  }
    `;
  }
  private renderRolesCheck():string{
    if(! this.roles.length){
      return ''
    }
    return `
    await httpContext.auth.check();
    if(! await httpContext.auth.user.hasRole([${this.roles.map(r=>`'${r.name}'`)}])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied'});
    }
    `
  }

  private renderPermissionsCheck():string {
    if(! this.permissions.length){
      return ''
    }
    return `
    await httpContext.auth.check();
    if(! await httpContext.auth.user.hasPermission([${this.permissions.map(p=>`'${p.name}'`)}])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false, message: 'Permission denied'});
    }
    `
  }
  private getMethodName():string{
    if(!this.sourceable_type){
      switch ( this.type) {
        case 'get':{
          return 'index'
        }
        case 'delete':{
          return 'destroy'
        }

        default: {
          return   this.type
        }
      }
    } else {
      switch ( this.sourceable_type) {
        case Customizer.sourceable_type:{
          return this.customizer?.name || `_${string.generateRandom(12)}`
        }
        case SQLEditor.sourceable_type:{
          return this.sQLEditor?.name || `_${string.generateRandom(12)}`
        }
      }
      return `_${string.generateRandom(12)}`
    }
  }

  private renderMethodBody(modelClassName:string):string {

    if(!this.sourceable_type){

      switch (this.type) {
        case 'show': {
          return `
    return httpContext.response.json((await ${modelClassName}.find(httpContext.params.${modelClassName}))?.serialize());
        `
        }
        case 'add': {
          return `
    let newModel = new ${modelClassName}();
    newModel.fill(httpContext.request.all());
    await newModel.save();
    return httpContext.response.json({success: true, data: newModel.serialize()});
        `
        }
        case 'options': {
          return this.renderOptionsBody(modelClassName)
        }
        case 'update': {
          return `
    let oldModel = await ${modelClassName}.find(httpContext.params.${modelClassName});
    if(!oldModel){
      httpContext.response.status(404);
      return httpContext.response.json({success:false, message: 'not found'})
    }
    oldModel.merge(httpContext.request.all());
    await oldModel.save();
    return httpContext.response.json({success:true, data: oldModel.serialize()});
          `
        }
        case 'delete': {
          return `
    let oldModel = await ${modelClassName}.find(httpContext.params.${modelClassName});
    if(!oldModel){
      httpContext.response.status(404);
      return httpContext.response.json({success:false, message: 'not found'})
    }
    await oldModel.delete();
    return httpContext.response.json({success:true,});
          `
        }
        case 'update_column': {
          return `
    let oldModel = await ${modelClassName}.find(httpContext.params.${modelClassName});
    if(!oldModel){
      httpContext.response.status(404);
      return httpContext.response.json({success:false, message: 'not found'})
    }
    oldModel[httpContext.params.column] = httpContext.request.input('column_value');
    await oldModel.save();
    return httpContext.response.json({success:true,});
          `
        }
        case 'get': {
          return this.renderIndexMethodBody(modelClassName)
        }
      }
    } else {
      switch (this.sourceable_type) {
        case Customizer.sourceable_type: {
          return this.renderCustomizerMethodBody()
        }
        case SQLEditor.sourceable_type: {
          return this.renderSQLEditorMethodBody()
        }
      }
    }
    return ''
  }

  private renderOptionsBody(modelClassName:string):string{
    return   `
    let query = ${modelClassName}.query();

    let filters = {};

    if(httpContext.request.qs().filters){
      try {
        filters = JSON.parse(httpContext.request.qs().filters);
      } catch (e) {

      }
    }

    for(let filter in filters){
      if(filters.hasOwnProperty(filter)){
        query.orWhere(filter, 'like', \`%\${filters[filter]}%\`);
      }
    }

    if(httpContext.request.qs().s){
      query.where(query=>{
        query.orWhere('${this.altrp_model.getTitleColumnName()}', 'like',
          \`%\${httpContext.request.qs().s}%\`);
        query.orWhere('${this.altrp_model.getLabelColumnName()}', 'like',
          \`%\${httpContext.request.qs().s}%\`);
      })
    }

    let result = (await query.select(
      { 'label':'${this.altrp_model.getLabelColumnName()}',  'value': 'id' }
    )).map(result => result.$extras);

    return httpContext.response.json(result);
        `
  }

  private renderIndexMethodBody(modelClassName: string):string {
    return `
    const query = ${modelClassName}.query();

    let search = httpContext.request.qs().s;
    let page = httpContext.request.qs().page;
    let limit = httpContext.request.qs().pageSize;
    let filters = {};

    if(httpContext.request.qs().filters){
      try {
        filters = JSON.parse(httpContext.request.qs().filters);
      } catch (e) {

      }
    }

    for(let filter in filters){
      if(filters.hasOwnProperty(filter)){
        query.orWhere(filter, 'like', \`%\${filters[filter]}%\`);
      }
    }

    if(search){
      ${this.altrp_model.getIndexedColumns().map(column => `
      query.orWhere('${column.name}', 'like', \`%\${search}%\`);
      `)}
    }


    const order = httpContext.request.qs()?.order === 'asc' ? 'asc' : 'desc';
    query.orderBy(httpContext.request.qs()?.order_by || 'id', order);

    `;
  }

  private renderCustomizerMethodBody() {
    return this.methodBody;
  }

  private prepareContent() {

    switch (this.type) {
      case 'customizer': {
        this.methodBody = `
    this.setCustomizerData('context.CurrentModel', ${this.model.name} )
    this.setCustomizerData('context.request', httpContext.request)
    this.setCustomizerData('httpContext', httpContext)
    this.setCustomizerData('request', httpContext.request)
    this.setCustomizerData('context.response', httpContext.response)
    this.setCustomizerData('response', httpContext.response)
    this.setCustomizerData('session', httpContext.session)
    this.setCustomizerData('this', this)
    this.setCustomizerData('current_user', httpContext.auth.user)
    ${this?.customizer?.getMethodContent() || ''}
    `}
      break;
      default : return
    }
  }

  private renderSQLEditorMethodBody() {
    return `
    const res = await selectForSQLEditor(
    "${this.sQLEditor?.sql}", {
       'sql_name' : '${this.sQLEditor?.name}',
       'table_name' : '${this.model?.table?.name}',
     }, httpContext.request );
    `;
  }
}
