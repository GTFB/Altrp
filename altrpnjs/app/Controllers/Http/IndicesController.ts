import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Edge from "../../../helpers/edge";
import Env from "@ioc:Adonis/Core/Env";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Application from '@ioc:Adonis/Core/Application'
import path from "path";
import isProd from "../../../helpers/isProd";
import base_path from "../../../helpers/path/base_path";
import applyPluginsFiltersSync from "../../../helpers/plugins/applyPluginsFiltersSync";
import applyPluginsFiltersAsync from "../../../helpers/plugins/applyPluginsFiltersAsync";
import fs from "fs";
import app_path from "../../../helpers/path/app_path";
import AltrpMeta from "App/Models/AltrpMeta";
import mbParseJSON from "../../../helpers/mbParseJSON";


export default class IndicesController {
  async admin({view}) {
    return view.render('admin', Edge({
      isProd: isProd(),
      applyPluginsFiltersSync,
      applyPluginsFiltersAsync,
      url: Env.get("PATH_ENV") === "production" ?
        `/modules/admin/admin.js?${Env.get('PACKAGE_KEY')}` : "http://localhost:3002/src/admin.js"
    }))
  }
  async customizer({view}) {
    return view.render('customizer', Edge({
      isProd: isProd(),
      applyPluginsFiltersSync,
      applyPluginsFiltersAsync,
      url: Env.get("PATH_ENV") === "production" ?
        `/modules/customizer/customizer.js?${Env.get('PACKAGE_KEY')}` : "http://localhost:3002/src/customizer.js"
    }))
  }

  public async editor({view}) {
    let global_styles:any = (await AltrpMeta.query().where('meta_name', 'global_styles').first())
    if(global_styles){
      global_styles = global_styles.meta_value
    } else {
      global_styles = '{}'
    }
    return view.render('editor', Edge({
      isProd: isProd(),
      applyPluginsFiltersSync,
      presetStyles: global_styles,
      applyPluginsFiltersAsync,
      url: Env.get("PATH_ENV") === "production" ?
        `/modules/editor/editor.js?${Env.get('PACKAGE_KEY')}` :
        "http://127.0.0.1:3000/src/bundle.js",
      css: Env.get("PATH_ENV") === "production" ?
        `/modules/editor/editor.css?${Env.get('PACKAGE_KEY')}` : null
    }))
  }

  public robot({ view }) {
    return view.render('robot', Edge({
      applyPluginsFiltersSync,
      applyPluginsFiltersAsync,
      url: Env.get("PATH_ENV") === "production" ? "/modules/robots/robots.js" : "http://localhost:3006/src/bundle.js",
      css: "/modules/editor/editor.css"
    }))
  }

  public editorContent({ view }) {
    let style = ''
    const files = fs.readdirSync(app_path('altrp-templates/styles/elements'))
    for(const f of files){

      if(path.extname(f) === '.css'){
        try {
          style += fs.readFileSync(app_path(`altrp-templates/styles/elements/${f}`))
        }catch (e) {
          console.error(e);
        }
      }
    }

    return view.render('editor-content', Edge({
      style,
      css: Env.get("PATH_ENV") === "production" ?
        `/modules/editor/editor.css` : null
    }))
  }

  public async serviceWorker({response}) {
    const pathToPublic = path.join(__dirname, "../", "../", "../", "../", (isProd() ? "../" : ""), "public", "sw.js");

    response.header("Content-Type", "text/javascript")

    const file = fs.readFileSync(pathToPublic, {
      encoding: 'utf8'
    })

    return file
  }

  public async loginView({view, auth,response}: HttpContextContract,) {
    await auth.use('web').check()
    if (auth.user) {
      if (await auth?.user?.isAdmin()) {
        return response.redirect( '/admin')
      } else {
        return response.redirect( '/')
      }
    }
    return view.render('login')
  }

  public async login({auth, request, response, }: HttpContextContract) {
    const loginSchema = schema.create({
      password: schema.string({trim: true,}, [
        rules.minLength(8)
      ]),
      email: schema.string({trim: true}, [
        rules.email()
      ]),
    })

    await request.validate({schema: loginSchema})
    const email = request.input('email')
    const password = request.input('password')
    const remember = !!request.input('remember')

    if (auth.use('web').isLoggedIn) {
      return response.redirect('/')
    }

    await auth.use('web').attempt(email, password, remember)
    if (! auth.use('web').isAuthenticated && request.input('altrpLogin')) {
      await auth.use('web').authenticate()

      return response.json({
        'success': true,
        '_token': request.csrfToken,
      });
    }

    if(auth.use('web').isAuthenticated && request.input('altrp_ajax')){
      return response.json({
        'success': true,
        'reload' : true,
      });
    }

    await auth.use('web').authenticate()

    if (await auth?.user?.isAdmin()) {
      const url = request.cookie('__altrp_admin_redirect_from', '/admin')
      response.clearCookie('__altrp_admin_redirect_from')
      return response.redirect(url)
    } else {
      return response.redirect( '/')
    }
  }

  public async logout({ auth }) {
    await auth.use("web").logout();

    return {
      success: true
    }
  }

  public async changelog({ response }) {
    const pathToPublic = base_path( "CHANGELOG.md");
    let file:any = ''

    try {
       file = fs.readFileSync(pathToPublic, {
         encoding: 'utf8'
       })
    } catch (e) {
      file = fs.readFileSync(base_path( "../CHANGELOG.md"), {
        encoding: 'utf8'
      })
      console.error(e);
    }

    response.header('Content-type', 'text/plain');

    return {data:file.toString()}
  }

  public async setCookie({ request, response }) {
    const body = request.body();

    if(!body.name || !body.value) {
      return false
    }

    response.cookie(body.name, body.value)

    return {
       success: true
    }
  }

  public async favicons({params, response}) {
    response.header('Content-type', 'image/png');

    let value: any = null

    const faviconPath = Application.tmpPath("favicon") + `/${params.path}`;
    const defaultFaviconPath = Application.resourcesPath("favicon") + `/altrp_${params.path}`

    if(fs.existsSync(faviconPath)) {
      value = fs.readFileSync(faviconPath, {
        encoding: 'utf8'
      })
    } else if(fs.existsSync(defaultFaviconPath)) {
      value = fs.readFileSync(defaultFaviconPath, {
        encoding: 'utf8'
      })
    }

    if(value) {
      return value
    } else {
      response.status(404)
      return {
        message: "favicon not found"
      }
    }
  }
}
