// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Menu from "App/Models/Menu";
import { v4 as uuid } from "uuid";
import Category from "App/Models/Category";
import CategoryObject from "App/Models/CategoryObject";

export default class MenusController {
  public async index() {
    const menus = await Menu.query().preload("categories")

    return menus.map((menu) => {
      return {
        ...menu.serialize(),
        categories: menu.categories.map(category => {
          return {
            category: category
          }
        })
      }
    })
  }

  public async show({params}) {

    const menuQuery = Menu.query();

    if(isNaN(params.id)) {
      menuQuery.where("guid", params.id)
    } else {
      menuQuery.where("id", parseInt(params.id))
    }

    const menu = await menuQuery.firstOrFail()

    return menu
  }

  public async update({params, request, response}) {

    const menuQuery = Menu.query();

    if(isNaN(params.id)) {
      menuQuery.where("guid", params.id)
    } else {
      menuQuery.where("id", parseInt(params.id))
    }

    const menu = await menuQuery.firstOrFail()

    menu.children = request.input("children");
    menu.name = request.input("name");
    menu.settings = request.input("settings");

    await menu.save();

    await menu.related("categories").detach();

    for (const option of request.input("categories")) {
      const category = await Category.query().where("guid", option.value).first();

      if (!category) {
        response.status(404)
        return {
          message: "Category not Found"
        }
      } else {
        await CategoryObject.create({
          category_guid: category.guid,
          object_type: "Menu",
          object_guid: menu.guid
        })
      }
    }

    return {
      success: true
    }
  }

  public async delete({params}) {

    const menuQuery = Menu.query();


    if(isNaN(params.id)) {
      menuQuery.where("guid", params.id)
    } else {
      menuQuery.where("id", parseInt(params.id))
    }

    const menu = await menuQuery.firstOrFail()

    menu.delete()

    return {
      success: true
    }
  }

  public async create({ request }) {
    const data = {
      children: request.input("children"),
      name: request.input("name"),
      guid: uuid()
    }

    const menu = await Menu.create(data);
    return {
      data: {
        ...menu.serialize(),
        editUrl: `/admin/menus/${menu.id}`
      },
      success: true
    }
  }
}
