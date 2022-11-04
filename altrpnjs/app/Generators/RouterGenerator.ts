import * as mustache from 'mustache'
import * as _ from 'lodash'
import fs from 'fs'
import isProd from "../../helpers/isProd";
import base_path from "../../helpers/base_path";
import Customizer from "App/Models/Customizer";
import Page from "App/Models/Page";

export default class RouterGenerator {

  public static customizersFileName: string = base_path('/start/routes/custom/routes.' + (isProd() ? 'js' : 'ts'))

  public async run(): Promise<void> {
    let custom = ''

    if (!fs.existsSync(base_path('/start/routes/custom/'))) {
      fs.mkdirSync(base_path('/start/routes/custom/'))
    }

    if (fs.existsSync(RouterGenerator.customizersFileName)) {
      let oldContent: string = fs.readFileSync(RouterGenerator.customizersFileName, {encoding: 'utf8'})
      if (oldContent) {
        custom = oldContent.match(/\/\/ CUSTOM_CODE([\s\S]+?)\/\/ CUSTOM_CODE/)?.pop() || ''
        custom = custom.trim()
      }
    }

    fs.writeFileSync(RouterGenerator.customizersFileName,
      mustache.render(this.getContent(), {
        custom,
        customizers: await this.getCustomizers(),
        pages: await this.getPages(),
      })
    )

  }


  private getContent(): string {
    return isProd() ? this._getProdContent() : this._getDevContent()
  }

  private async getCustomizers() {
    let customizers :any[] = await Customizer.query().where('type', 'api')
      .preload('source').preload('altrp_model', query => {
        query.preload('table')
      })
    let content = `
    `
    customizers = await Promise.all(customizers.map(async c => {
      if(! c.altrp_model || ! c.altrp_model?.table){
        return  null
      }
      let controllerName = `${c.altrp_model?.name}Controller`
      controllerName = controllerName.replace(/\\/g, '\\\\')
      const methodName = c.name
      const method = await c.getRequestType()
      let url = c.allowApi() ? `api/v1/${methodName}` : `ajax/models/${c.altrp_model?.table?.name}/customizers/${methodName}`
      return{
        method,
        url,
        controllerName,
        methodName,
        allowApi: c.allowApi(),
      }
    }))
    customizers = customizers.filter(c=>c)
    customizers.forEach((c:any) => {
      const {
        method,
        url,
        controllerName,
        methodName,
        allowApi,
      } = c
      content += `
Route.${method}('${url}', ${isProd() ? `async (httpContext)=>{
    let controller = require('../../../app/AltrpControllers/${controllerName}').default;
    controller = new controller;
    return await controller.${methodName}(httpContext);
}` : `'${controllerName}.${methodName}'`}).middleware('catch_unhandled_json')${
        allowApi ? `.middleware('cors')` : ''
      };
      `
    })
    content +=`
    `
    return content
  }

  private _getProdContent(): string {
    return `
const Route = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route")).default;
const AltrpRouting = __importDefault(global[Symbol.for('ioc.use')]("App/Controllers/Http/AltrpRouting")).default;
{{{customizers}}}
{{{pages}}}
// CUSTOM_CODE
{{{custom}}}
// CUSTOM_CODE
`
  }

  private _getDevContent(): string {

    return `
import Route from '@ioc:Adonis/Core/Route'
import AltrpRouting from "App/Controllers/Http/AltrpRouting";
{{{customizers}}}
{{{pages}}}
// CUSTOM_CODE
{{{custom}}}
// CUSTOM_CODE
`
  }

  private async getPages() {
    let content = ''
    let pages = await Page.query().whereNull('deleted_at')
    pages = _.uniqBy(pages, i => i.path)
    pages.forEach((page) => {
      content += `
Route.get('${page.path}', async (httpContext)=>{
  const altrpRouting = new AltrpRouting;
  httpContext.response.header('x-generated-route', 'true')
  return await altrpRouting.getContentByUrl(httpContext.request.url(),
    httpContext,
    ${page.id}
  );
})
      `
    })
    return content
  }
}
