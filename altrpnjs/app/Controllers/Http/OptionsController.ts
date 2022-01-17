// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Page from "App/Models/Page";

export default class OptionsController {
  public async pages() {
    const pages = await Page.all()

    const options = pages.map((page) => {
      return {
        value: page.id,
        label: page.title
      }
    })
    return options
  }
}
