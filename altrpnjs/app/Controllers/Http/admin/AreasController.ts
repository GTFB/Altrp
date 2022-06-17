// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Area from "App/Models/Area";
import Category from "App/Models/Category";
import CategoryObject from "App/Models/CategoryObject";
import {v4 as uuid} from "uuid";
import LIKE from "../../../../helpers/const/LIKE";

export default class AreasController {
  public async index({request}) {
    const params = request.qs()
    const page = parseInt(params.page) || 1
    const pageSize = parseInt(params.pageSize) || 10
    const searchWord = params.s
    let areas

    if (searchWord) {
      areas = await Area.query().orWhere('name', LIKE, `%${searchWord}%`)
        .orWhere('title', LIKE, `%${searchWord}%`).preload("categories").paginate(page, pageSize)
    } else {
      areas = await Area.query().preload("categories").paginate(page, pageSize)
    }


    return areas.all()
      .filter(area => {
        const parsedSettings = JSON.parse(area?.settings)
        if (parsedSettings?.plugin || parsedSettings?.admin_hidden) return false
        return true
      })
      .map(area => {
        return {
          ...area.$attributes,
          categories: area.categories.map(category => {
            return {
              category: category
            }
          }),
          count: areas.getMeta().total,
          pageCount: areas.getMeta().last_page,
        }

      })
  }

  public async show({params}) {
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

  public async update({request, response, params}) {
    const area = await Area.query().where("id", parseInt(params.id)).firstOrFail();

    area.name = request.input("name");
    area.settings = JSON.stringify(request.input("settings"));
    area.title = request.input("title")

    await area.related("categories").detach();
    await area.save()

    for (const option of request.input("categories")) {
      const category = await Category.query().where("guid", option.value).first();

      if (category) {
        await CategoryObject.create({
          category_guid: category.guid,
          object_type: "Area",
          object_guid: area.guid
        })
      }
    }

    return response.json({
      success: true
    })

  }

  public async delete({params}) {
    const area = await Area.query().where("id", parseInt(params.id)).firstOrFail();

    await area.delete()

    return {
      success: true
    }
  }


  public async create({request, response}) {

    const area = await Area.create({
      name: request.input("name"),
      settings: JSON.stringify(request.input("settings")),
      guid: uuid(),
      title: request.input("title")
    })

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
          object_type: "Area",
          object_guid: area.guid
        })
      }
    }

    return area
  }
}
