// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Page from "App/Models/Page";
import Role from "App/Models/Role";
import options from "../../../helpers/options";
import Permission from "App/Models/Permission";

export default class OptionsController {
  public async pages() {
    const pages = await Page.all()

    return options(pages, {
      value: "id",
      label: "title"
    })
  }

  public async roles() {
    const roles = await Role.all()

    return options(roles, {
      value: "id",
      label: "display_name"
    })
  }

  public async permissions() {
    const permissions = await Permission.all()

    return options(permissions, {
      value: "id",
      label: "display_name"
    })
  }
}
