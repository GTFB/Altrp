// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Area from "App/Models/Area";
import Category from "App/Models/Category";
import CategoryObject from "App/Models/CategoryObject";
import { v4 as uuid } from "uuid";

export default class AreasController {
  public async index() {
    return await Area.getAllWithNames()
  }

  public async show({ params }) {
    const area = await Area.query().where("id", parseInt(params.id)).preload("categories").firstOrFail();

    return {
      ...area.serialize(),
      settings: JSON.parse(area.settings),
      categories: area.categories.map(category => ({
        label: category.title,
        value: category.guid
      }))
    }
  }

  public async update({ request, response, params }) {
    const area = await Area.query().where("id", parseInt(params.id)).firstOrFail();

    area.name = request.input("name");
    area.settings = request.input("settings");
    area.title = request.input("title")

    await area.related("categories").detach();

    for (const option of request.input("categories")) {
      const category = await Category.find(option.value);

      if (!category) {
        response.status(404)
        return {
          message: "Category not Found"
        }
      } else {
        await CategoryObject.create({
          category_guid: category.guid,
          object_type: "Area",
          object_guid: area.guid
        })
      }
    }
  }

  public async delete({ params }) {
    const area = await Area.query().where("id", parseInt(params.id)).firstOrFail();

    await area.delete()

    return {
      success: true
    }
  }


  public async create({ request, response }) {

    const area = await Area.create({
      name: request.input("name"),
      settings: JSON.stringify(request.input("settings")),
      guid: uuid(),
      title: request.input("title")
    })

    for (const option of request.input("categories")) {
      const category = await Category.find(option.value);

      if (!category) {
        response.status(404)
        return {
          message: "Category not Found"
        }
      } else {
        await CategoryObject.create({
          category_guid: category.guid,
          object_type: "Area",
          object_guid: area.guid
        })
      }
    }

    return area
  }
}
