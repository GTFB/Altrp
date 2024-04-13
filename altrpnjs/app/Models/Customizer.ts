import data_get from "../../helpers/data_get";
import empty from "../../helpers/empty";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
  hasMany,
  HasMany,
  beforeDelete
} from "@ioc:Adonis/Lucid/Orm";
import Model from "App/Models/Model";
import Category from "App/Models/Category";
import Cron from "App/Models/Cron";
import StartNode from "App/Customizer/Nodes/StartNode";
import BaseNode from "App/Customizer/Nodes/BaseNode";
import Edge from "App/Customizer/Nodes/Edge";
import SwitchNode from "App/Customizer/Nodes/SwitchNode";
import ReturnNode from "App/Customizer/Nodes/ReturnNode";
import ChangeNode from "App/Customizer/Nodes/ChangeNode";
import * as _ from "lodash";
import str_replace from "../../helpers/str_replace";
import Source from "App/Models/Source";
import escapeRegExp from "../../helpers/escapeRegExp";
import DocumentNode from "App/Customizer/Nodes/DocumentNode";
import CrudNode from "App/Customizer/Nodes/crudNode";
import MessageNode from "App/Customizer/Nodes/MessageNode";
import CustomizerNode from "App/Customizer/Nodes/CustomizerNode";
import DiscordNode from "App/Customizer/Nodes/DiscordNode";
import CustomizerGenerator from 'App/Generators/CustomizerGenerator'
import {DateTime} from 'luxon'
import getNextWeek from "../../helpers/getNextWeek";
import {clearTimeout, setTimeout} from "node:timers";
import app_path from "../../helpers/path/app_path";
import isProd from "../../helpers/isProd";
import HttpContext from "@ioc:Adonis/Core/HttpContext";
import { addSchedule, removeSchedule, nextInvocation } from '../../helpers/schedule';
import exec from '../../helpers/exec'
import ApiNodeV2 from "App/Customizer/Nodes/ApiNodeV2";
import base_path from "../../helpers/base_path";
import applyPluginsFiltersAsync from "../../helpers/plugins/applyPluginsFiltersAsync";
import applyPluginsFiltersSync from "../../helpers/plugins/applyPluginsFiltersSync";
import MapperNode from "App/Customizer/Nodes/MapperNode";
import ValidatorNode from "App/Customizer/Nodes/ValidatorNode";
import EmailTemplateNode from "App/Customizer/Nodes/EmailTemplateNode";
import EventNode from "App/Customizer/Nodes/EventNode";
import clearValue from "../../helpers/cache/clearValue";
import fs from "fs";
import path from "path";
import ListenerGenerator from "App/Generators/ListenerGenerator";
import setValue from "../../helpers/cache/setValue";
import getValue from "../../helpers/cache/getValue";

export default class Customizer extends BaseModel {
  timeout

  public static sourceable_type = `App\\Altrp\\Customizer`

  public static table = 'altrp_customizers'
  public static listener_imports = 'listener_imports'

  public parsed_data: any

  @column({isPrimary: true})
  public id: number

  @column()
  public name: string

  @column()
  public title: string

  @column()
  public type: string

  @column()
  public guid: string

  @column.dateTime({autoCreate: true})
    public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @column({
    consume: (data) => {
      return JSON.parse(data)
    },
    prepare: (data) => {
      return JSON.stringify(data)
    },
  })
  public data: any

  @column({
    consume: (settings) => {
      return JSON.parse(settings)
    },
    prepare: (settings) => {
      return JSON.stringify(settings)
    },
  })
  public settings: CustomizerSettings

  @column()
  public model_id: number

  @column()
  public model_guid: string | undefined

  @belongsTo(() => Model, {
    foreignKey: 'model_id'
  })
  public altrp_model: BelongsTo<typeof Model>

  @hasOne(() => Source, {
    foreignKey: 'sourceable_id',
    onQuery(query) {
      query.where('sourceable_type', 'App\\Altrp\\Customizer')
    }
  })
  public source: HasOne<typeof Source>

  @hasMany(() => Cron, {    foreignKey: 'customizer_id',
    localKey: 'id',
  })
  public crons: HasMany<typeof Cron>

  @manyToMany(() => Category, {
    pivotTable: 'altrp_category_objects',
    relatedKey: 'guid',
    localKey: 'guid',
    pivotForeignKey: 'object_guid',
    pivotRelatedForeignKey: 'category_guid',
  })
  public categories: ManyToMany<typeof Category>

  @beforeDelete()
  public static async beforeDelete(customizer: Customizer) {
    if (customizer.type === 'schedule') {
      const cron = await Cron.findBy('customizer_id', customizer.id)

      await cron?.delete()
    }
  }

  methodToJS(method, method_settings = []) {
    if (!method) {
      return ''
    }
    if (method.indexOf('.') !== -1) {
      method = method.split('.')[1]
    }
    let JSContent = '.' + method + '('
    let parameters = data_get(method_settings, 'parameters', [])
    parameters = parameters.filter(function (item) {
      return !empty(item) && data_get(item, 'value')
    })
    for (let key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        let parameter = parameters[key]
        JSContent += this.propertyToJS(data_get(parameter, 'value', []))
        if (parseInt(key) < parameters.length - 1) {
          JSContent += ', '
        }
      }
    }
    JSContent += ')'
    return JSContent
  }

  propertyToJS(property): string {
    let JSContent = ''
    if (empty(property)) {
      return 'null'
    }
    let namespace = data_get(property, 'namespace', 'context')
    let path = data_get(property, 'path')

    let JSExpression = data_get(property, 'JSExpression', 'null')
    JSExpression = Customizer.replaceMustache(JSExpression)
    let method = data_get(property, 'method')
    let awaitOn = data_get(property, 'awaitOn')
    let method_settings = data_get(property, 'methodSettings', [])

    switch (namespace) {
      case 'string': {
        JSContent += `'` + path + `'`
      }

        break
      case 'expression': {
        JSContent += JSExpression
      }
        break
      case 'number': {
        JSContent += path
      }
        break
      case 'env': {
        JSContent = `this.getCustomizerData('env.${path}')`
      }
        break
      case 'session':
      case 'context':
      case 'this':
      case 'current_user': {
        if (!path) {
          return '""'

        } else {
          path = namespace + '.' + path
        }
        JSContent = `this.getCustomizerData('${path}')`
        if (method) {

          if(awaitOn) {
            JSContent = `await ${JSContent}`
          }
          JSContent += this.methodToJS(method, method_settings)
        }
      }
        break
      default:
        JSContent = 'null'
    }
    return JSContent
  }

  customizerBuildCompare(operator: string, leftJSProperty, rightJSProperty): string {

    if (!operator || operator == 'empty') {
      return `empty(${leftJSProperty})`
    }
    switch (operator) {
      case 'not_empty': {
        this.addImport(this.importsList.importEmpty)
        return `! empty(${leftJSProperty})`
      }
      case 'null': {
        return `${leftJSProperty} == null`
      }
      case 'not_null': {
        return `${leftJSProperty} != null`
      }
      case 'true': {
        return `${leftJSProperty} == true`
      }
      case 'false': {
        return `${leftJSProperty} == false`
      }
      case '==': {
        return `${leftJSProperty} == ${rightJSProperty}`
      }
      case '<>': {
        return `${leftJSProperty} != ${rightJSProperty}`
      }
      case '<': {
        return `${leftJSProperty} < ${rightJSProperty}`
      }
      case '>': {
        return `${leftJSProperty} > ${rightJSProperty}`
      }
      case '<=': {
        return `${leftJSProperty} <= ${rightJSProperty}`
      }
      case '>=': {
        return `${leftJSProperty} >= ${rightJSProperty}`
      }
      case 'in': {
        return ` ${rightJSProperty}?.indexOf(${leftJSProperty}) !== -1`
      }
      case 'not_in': {
        return ` ${rightJSProperty}?.indexOf(${leftJSProperty}) === -1`
      }
      case 'contain': {
        return ` ${rightJSProperty}?.indexOf(${leftJSProperty}) !== -1`
      }
      case 'not_contain': {
        return ` ${rightJSProperty}?.indexOf(${leftJSProperty}) === -1`
      }
      case 'default':
      case 'else': {
        return ``
      }
      default:
        return 'null'
    }
  }

  changeToJS(path, value, settings?: { dynamic?: boolean, type?: string }) {

    let v: any = null;

    if(_.isString(value)) {
      if(settings?.dynamic) {
        v = value
      } else {
        v = `'${value}'`
      }
    } else {
      v = value
    }

    return `this.${settings?.type || "set"}CustomizerData('${path}', ${v});
    `;
  }

  @column()
  public time: number

  @column()
  public time_type: string

  public getTimeInMilliseconds() {

    const count = Math.abs(this.time - 1);

    switch (this.time_type) {
      case "day":
        const oneDay = 86400000;
        const toNextDay = oneDay - new Date().getTime() % oneDay;
        return (oneDay * count) + toNextDay
      case "week":
        return getNextWeek(count)
      case "minute":
        const oneMinute = 60000;
        const toNextMinute = oneMinute - new Date().getTime() % oneMinute;
        return (oneMinute * count) + toNextMinute
      default:
        const oneHour = 3600000;
        const toNextHour = oneHour - new Date().getTime() % oneHour;
        return (oneHour * count) + toNextHour
    }
  }

  async start(model: Model) {
    this.timeout = setTimeout(() => this.callCustomizer(model), this.getTimeInMilliseconds())
  }

  stop() {
    clearTimeout(this.timeout)
  }

  async callCustomizer(model: Model) {
    const customizer = this


    const controllerName = app_path(`AltrpControllers/${model.name}Controller`);

    const ControllerClass = isProd() ? (await require(controllerName)).default
      : (await import(controllerName)).default
    const controller = new ControllerClass()

    if(controller[customizer.name]) {
      await controller[customizer.name](HttpContext)
    } else {
      console.error("customizer name invalid")
    }

    this.timeout = setTimeout(() => this.callCustomizer(model), this.getTimeInMilliseconds())
  }

  async callCrud(instance) {
    const customizer = this

    if (customizer.type !== 'crud') {
      return
    }

    const generator = new CustomizerGenerator(customizer)
    const filePath = generator.getFilePath()

    const classCustomizerCRUD = isProd()
      ? (await require(filePath)).default
      : (await import(filePath)).default

    if (classCustomizerCRUD) {
      const customizerCRUD = new classCustomizerCRUD

      await customizerCRUD.run(instance)
    }
  }

  public static async scheduleAll() {
    const customizers = await Customizer.query().where('type', 'schedule')

    console.log(`found schedules (${customizers.length})`)

    customizers.forEach(customizer => customizer.schedule())
  }

  public async schedule() {
    if (this.type !== 'schedule' || !this.settings) {
      return
    }

    console.log(`new schedule: run ${this.name}`
      + ` per ${this.settings.period} ${this.settings.period_unit}`
      + ` from ${this.settings.start_at || 'now'}`
      + ` and repeat ${this.settings.infinity ? 'infinitely' : `${this.settings.repeat_count} times`}`)

    const date = this.settings.start_at ? new Date(this.settings.start_at) : new Date()

    // @ts-ignore
    addSchedule(this.id, date, this.settings.period_unit, this.settings.period, async () => {
      if (!this.settings.infinity) {
        // @ts-ignore
        if (this.settings.repeat_count > 0) {
          // @ts-ignore
          this.settings.repeat_count--

          await this.save()

          return this.invoke()
        }

        return this.removeSchedule()
      }

      this.invoke()
    })

    this.settings.next_run = DateTime.fromJSDate(nextInvocation(this.id)?.toDate())
    await this.save()
  }

  public async invoke() {
    let cronLog = ''

    console.log('customizer ' + this.name + ' was invoked (' + this.settings.repeat_count + ' times left)')

    try {
      const result = await exec(`node ${base_path('ace')} customizer:schedule ${this.id.toString()}`)

      if (result) {
        cronLog = result
      }
    } catch (err) {
      if (err) {
        cronLog = err
      }
    }

    await Cron.createByCustomizer(this, cronLog)

    this.settings.last_run = DateTime.now()
    this.settings.next_run = DateTime.fromJSDate(nextInvocation(this.id)?.toDate())
    await this.save()
  }

  public async removeSchedule() {
    removeSchedule(this.id)

    console.log(`remove schedule: ${this.name} / ${this.id}`)
  }

  changePropertyToJS(propertyData, value, type = 'set'): string {
    if (empty(propertyData)) {
      return 'null'
    }
    let namespace = data_get(propertyData, 'namespace', 'context')
    let path = data_get(propertyData, 'path')
    let JSExpression = data_get(propertyData, 'JSExpression')
    let JSContent
    switch (namespace) {
      case 'expression':{
        JSContent = `${JSExpression} = ${value};
`

      }
        break;
      case 'context': {
        if (!path) {
          path = namespace
        } else {
          path = namespace + '.' + path
        }
        JSContent = `
        this.${type}CustomizerData('${path}', ${value});
        `

      }
        break
      default:
        JSContent = 'null'
    }
    return JSContent
  }

  private importsList = {
    importEmpty: `const empty = (await import('../../../helpers/empty')).default`,
  }


  addImport(importString: string) {
    if (this.imports.indexOf(importString) !== -1) {
      return
    }
    this.imports.push(importString)
  }

  private imports: string[] = []

  renderImports(): string {
    return this.imports.join('\n')
  }

  public getStartNode(): StartNode | null {
    if(!this.data){
      return null
    }
    if (!this.parsed_data) {
      this.parsed_data = Customizer.parseData(this.data, this);
    }

    return BaseNode.getStartNode(this.parsed_data);
  }

  /**
   * @return Collection
   */
  public getStartNodes(): any[] {
    if (!this.parsed_data) {
      this.parsed_data = Customizer.parseData(this.data, this);
    }

    return BaseNode.getStartNodes(this.parsed_data);
  }

  /**
   * @return string
   */
  public async getRequestType(): Promise<string> {
    const startNode = this.getStartNode()
    let type = 'get'
    if(startNode){
      type = startNode.getRequestType()
    }
    type = await applyPluginsFiltersAsync('get_customizer_request_type', type, this)

    return type
  }

  public static parseData( data, customizer ){
    if(!_.isArray(data)){
      data = []
    }
    data = data.map( item  => {
      const type = data_get( item, 'type' )
      switch( type ){
        case 'straight':
        case 'step':
        case 'smoothstep':
        case 'default': return new Edge( item, customizer )
        case 'switch': return new SwitchNode( item, customizer )
        case 'mapper': return new MapperNode( item, customizer )
        case 'start': return new StartNode( item , customizer)
        case 'return': return new ReturnNode( item, customizer )
        case 'change': return new ChangeNode( item, customizer )
        case 'event': return new EventNode( item, customizer )
        case 'validator': return new ValidatorNode( item, customizer )
        case 'email_template': return new EmailTemplateNode( item, customizer )
        case 'documentAction': return new DocumentNode(item, customizer)
        case 'crudAction': return new CrudNode(item, customizer)
        case 'apiAction': return new ApiNodeV2(item, customizer)
        case 'messageAction': return new MessageNode(item, customizer)
        case 'customizer': return new CustomizerNode(item, customizer)
        case 'discordAction': return new DiscordNode(item, customizer)
        default: {
          let classInstance = applyPluginsFiltersSync('get_node_class_instance', type, item, customizer)
          if(! classInstance || typeof classInstance === 'string'){
            return new BaseNode( item, customizer )
          }
          return classInstance
        }
      }
    })
    data.forEach( ( node_item ) => {
      const node_id = node_item.getId()
      let edges = BaseNode.getNodesByType('Edge', data)
      edges = edges.filter( ( node )=> {
        return node.data['source'] == node_id
      })
      if( node_item instanceof SwitchNode ){
        edges = _.sortBy(edges,( node, key )=> {
          if( data_get(node,'data.sourceHandle') ){
            key = str_replace('yes-', '',data_get(node,'data.sourceHandle'))
          }
          return key
        })
      }
      edges.forEach(( edge ) =>{
        const child = BaseNode.findNodeById( edge.data['target'], data )
        if( child ){
          node_item.addChild( child )
        }
      })
    })
    return  data
  }
  getMethodContent(){
    let startNode = this.getStartNode()
    let content = startNode ? startNode.getJSContent() : ''
    content = applyPluginsFiltersSync('customizer_render_content', content, this)

    return content
  }

  static replaceMustache(expression:string, before: string = '', after: string = ''):string{

    let paths = _.isString(expression) ? expression.match(/{{([\s\S]+?)(?=}})/g) : null;
    if (_.isArray(paths)) {
      paths.forEach(path => {
        path = path.replace("{{", "");
        let replace = `${before}this.getCustomizerData(\`${path}\`)${after}`

        path = escapeRegExp(path);
        expression = expression.replace(new RegExp(`{{${path}}}`, "g"), replace || "");
      });
    }
    // @ts-ignore
    expression = expression.replaceAll('/{/{', '{{')
    // @ts-ignore
    expression = expression.replaceAll('/{/{/{', '{{{')
    // @ts-ignore
    expression = expression.replaceAll('/}/}', '}}')
    // @ts-ignore
    expression = expression.replaceAll('/}/}/}', '}}}')
    return expression
  }

  async allowMethod(method: string){
    const request_type = await this.getRequestType()

    return request_type.toLowerCase() === method.toLowerCase()
  }

  allowApi():boolean{
    return ! ! _.get(this, 'settings.external')
  }

  public static async callCustomEvents(eventName, data){
    let listenerImports = await  getValue(Customizer.listener_imports)
    if(! listenerImports){
      await Customizer.updateCustomEventListeners()
      listenerImports = await  getValue(Customizer.listener_imports)
    }
    if(_.isArray(listenerImports[eventName])){
      for(const listenerClass of listenerImports[eventName]){
        const instance = new listenerClass
        data = (await instance.run(eventName, data)) || data
      }
    }
    return data
  }


  public static async updateCustomEventListeners(){
    const listeners = await  Customizer.query().where('type', 'listener')

    await clearValue(Customizer.listener_imports)
    const listenerImports = {}

    for(const l of listeners){

      if(fs.existsSync(path.join(ListenerGenerator.directory, l.name + ListenerGenerator.ext))){
        if(! l.settings.hook_type){
          continue
        }
        listenerImports[l.settings.hook_type] = listenerImports[l.settings.hook_type] || []
        listenerImports[l.settings.hook_type].push(require(path.join(ListenerGenerator.directory, l.name + ListenerGenerator.ext)).default)
      }
    }
    await setValue(Customizer.listener_imports, listenerImports)
    console.log('Customizer Updates Custom Event Listeners!!!')
  }

}

type CustomizerSettings = {
  middlewares?: any[];
  type?: string;
  start_at?: any;
  period_unit?: string;
  period?: string | number;
  infinity?: Boolean;
  repeat_count?: string | number;
  next_run?: DateTime;
  last_run?: DateTime;
  time_type?: string;
  time?: string;
  hook_type?:string;
  event_type?:string;
  event_hook_type?:string;
}
