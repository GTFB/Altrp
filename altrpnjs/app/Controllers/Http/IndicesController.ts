import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Edge from "../../../helpers/edge";
import Env from "@ioc:Adonis/Core/Env";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'

export default class IndicesController {
  async admin({view}) {
    return view.render('admin', Edge({
      url: Env.get("PATH_ENV") === "production" ? "/modules/admin/admin.js" : "http://localhost:3002/src/bundle.js"
    }))
  }
  async customizer({view}) {
    return view.render('customizer', Edge({
      url: Env.get("PATH_ENV") === "production" ? "/modules/customizer/customizer.js" : "http://localhost:3007/src/bundle.js"
    }))
  }

  public editor({view}) {
    return view.render('editor', Edge({
      url: Env.get("PATH_ENV") === "production" ? "/modules/editor/editor.js" : "http://127.0.0.1:3000/src/bundle.js",
      css: Env.get("PATH_ENV") === "production" ? "/modules/editor/editor.css" : null
    }))
  }

  public robot({ view }) {
    return view.render('robot', Edge({
      url: Env.get("PATH_ENV") === "production" ? "/modules/editor/robots.js" : "http://localhost:3006/src/bundle.js",
      css: Env.get("PATH_ENV") === "production" ? "/modules/editor/editor.css" : "/modules/editor/editor.css"
    }))
  }

  public editorContent({ view }) {
    return view.render('editor-content', Edge({
      css: Env.get("PATH_ENV") === "production" ? "/modules/editor/editor.css" : null
    }))
  }

  // public frontApp({ view }) {
  //   return view.render('front-app', Edge({
  //     hAltrp: Env.get("PATH_ENV") === "production" ? "/modules/front-app/h-altrp.js" : null
  //   }))
  // }

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
      password: schema.string({trim: true}, [
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
      return response.redirect( '/admin')
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

  public async favicons({params, response}) {
    response.header('Content-type', 'image/png');

    let value: any = null

    const faviconPath = Application.tmpPath("favicon") + `/${params.path}`;
    const defaultFaviconPath = Application.resourcesPath("favicon") + `/altrp_${params.path}`

    if(await Drive.exists(faviconPath)) {
      value = await Drive.get(faviconPath)
    } else if(await Drive.exists(defaultFaviconPath)) {
      value = await Drive.get(defaultFaviconPath)
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
