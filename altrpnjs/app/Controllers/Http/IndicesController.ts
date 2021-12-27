// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Edge from "../../../helpers/edge";
import Env from "@ioc:Adonis/Core/Env";

export default class IndicesController {
  public admin({ view }) {
    return view.render('admin', Edge({
      url: Env.get("PATH_ENV") === "production" ? "/modules/admin/admin.js" : "http://localhost:3002/src/bundle.js"
    }))
  }

  public editor({ view }) {
    return view.render('editor', Edge({
      url: Env.get("PATH_ENV") === "production" ? "/modules/editor/editor.js" : "http://localhost:3002/src/bundle.js",
      css: Env.get("PATH_ENV") === "production" ? "/modules/editor/editor.css" : null
    }))
  }

  public editorContent({ view }) {
    return view.render('editor-content', Edge({
      css: Env.get("PATH_ENV") === "production" ? "/modules/editor/editor.css" : null
    }))
  }

  public loginView({ view }) {
    return view.render('login')
  }

  public async login({ auth, request }) {
  const email = request.input('email')
  const password = request.input('password')

  await auth.use('web').attempt(email, password)
  }
}
