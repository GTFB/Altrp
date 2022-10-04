import data_get from "../../helpers/data_get";
import empty from "../../helpers/empty";
import {BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne, ManyToMany, manyToMany} from "@ioc:Adonis/Lucid/Orm";
import Model from "App/Models/Model";
import Category from "App/Models/Category";
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
import ApiNode from "App/Customizer/Nodes/ApiNode";
import MessageNode from "App/Customizer/Nodes/MessageNode";
import CustomizerNode from "App/Customizer/Nodes/CustomizerNode";
import DiscordNode from "App/Customizer/Nodes/DiscordNode";
import {DateTime} from 'luxon'
import getNextWeek from "../../helpers/getNextWeek";
import {clearTimeout, setTimeout} from "node:timers";
import app_path from "../../helpers/path/app_path";
import isProd from "../../helpers/isProd";
import HttpContext from "@ioc:Adonis/Core/HttpContext";
import { addSchedule, removeSchedule } from '../../helpers/schedule';
import exec from '../../helpers/exec'

export default class Customizer extends BaseModel {
  timeout

  public static sourceable_type = `App\\Altrp\\Customizer`

  public static table = 'altrp_customizers'

  private parsed_data: any

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
  public settings: any

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

  @manyToMany(() => Category, {
    pivotTable: 'altrp_category_objects',
    relatedKey: 'guid',
    localKey: 'guid',
    pivotForeignKey: 'object_guid',
    pivotRelatedForeignKey: 'category_guid',
  })
  public categories: ManyToMany<typeof Category>

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
          path = namespace
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

  public static async scheduleAll() {
    const customizers = await Customizer.query().where('type', 'schedule')

    console.log(`found schedules (${customizers.length})`)

    customizers.forEach(customizer => customizer.schedule())
  }

  public schedule() {
    if (this.type !== 'schedule' || !this.settings) {
      return
    }

    console.log(`new schedule: run ${this.name}`
      + ` per ${this.settings.period} ${this.settings.period_unit}`
      + ` from ${this.settings.start_at || 'now'}`
      + ` and repeat ${this.settings.infinity ? 'infinitely' : `${this.settings.repeat_count} times`}`)

    const date = this.settings.start_at ? new Date(this.settings.start_at) : new Date()

    addSchedule(this.id, date, this.settings.period_unit, this.settings.period, () => {
      if (!this.settings.infinity) {
        if (this.settings.repeat_count > 0) {
          this.settings.repeat_count--

          this.save().then(() => {
            if (this.settings.repeat_count <= 0) {
              this.removeSchedule()
            }

            return this.invoke()
          })
        }

        this.removeSchedule()
      }

      this.invoke()
    })
  }

  public async invoke() {
    console.log('customizer ' + this.name + ' was invoked (' + this.settings.repeat_count + ' times left)')
    exec(`node ace customizer:schedule ${this.id.toString()}`).then(data => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    })
  }

  public removeSchedule() {
    removeSchedule(this.id)

    console.log(`remove schedule: ${this.name} / ${this.id}`)
  }

  changePropertyToJS(propertyData, value, type = 'set'): string {
    if (empty(propertyData)) {
      return 'null'
    }
    let namespace = data_get(propertyData, 'namespace', 'context')
    let path = data_get(propertyData, 'path')
    let JSContent
    switch (namespace) {
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

  private getStartNode(): StartNode | null {
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
  public getRequestType(): string {
    const startNode = this.getStartNode()
    if(startNode === null || startNode === undefined){
      return  'get'
    }
    return startNode.getRequestType()
  }

  public static  parseData( data, customizer ){

    data = data.map( item  => {
      const type = data_get( item, 'type' )
      switch( type ){
        case 'default': return new Edge( item, customizer )
        case 'switch': return new SwitchNode( item, customizer )
        case 'start': return new StartNode( item , customizer)
        case 'return': return new ReturnNode( item, customizer )
        case 'change': return new ChangeNode( item, customizer )
        case 'documentAction': return new DocumentNode(item, customizer)
        case 'crudAction': return new CrudNode(item, customizer)
        case 'apiAction': return new ApiNode(item, customizer)
        case 'messageAction': return new MessageNode(item, customizer)
        case 'customizer': return new CustomizerNode(item, customizer)
        case 'discordAction': return new DiscordNode(item, customizer)
        default: return new BaseNode( item, customizer )
      }
    })
    data.forEach( ( node_item ) => {
      if( node_item instanceof Edge ){
      }
      const node_id = node_item.getId()
      let edges = BaseNode.getNodesByType('default', data)
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
    return startNode ? startNode.getJSContent() : ''
  }

  static replaceMustache(expression:string):string{

    let paths = _.isString(expression) ? expression.match(/{{([\s\S]+?)(?=}})/g) : null;
    if (_.isArray(paths)) {
      paths.forEach(path => {
        path = path.replace("{{", "");
        let replace = `this.getCustomizerData(\`${path}\`)`

        path = escapeRegExp(path);
        expression = expression.replace(new RegExp(`{{${path}}}`, "g"), replace || "");
      });
    }
    return expression
  }

  allowMethod(method: string){
    const startNode = this.getStartNode()

    if (! startNode){
      return false
    }
    const request_type = startNode.getDataByPath('request_type') || 'get'

    return request_type.toLowerCase() === method.toLowerCase()
  }
}
