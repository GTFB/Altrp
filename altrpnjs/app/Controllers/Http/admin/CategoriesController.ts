// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category";
import { v4 as uuid } from "uuid";

export default class CategoriesController {
  public async index() {
    const categoires = await Category.all()

    return categoires
  }

  public async create({request, response}) {
    const name = request.input("name");
    const guid = uuid()
    const description = request.input("description")
    const title = request.input("title")

    if(!name || !title) {
      response.status(500)
      return {
        message: "Fill all fields"
      }
    }

    const category = await Category.create({
      name,
      guid,
      description,
      title
    })

    return {
      data: category,
      message: "success",
      success: true
    }
  }

  public async show({params, response}) {
    const id = parseInt(params.id);

    const category = await Category.find(id);


    if(category) {
      return {
        data: category,
        message: "success",
        success: true
      }
    } else {
      response.status(404)
      return {
        message: "Category not found"
      }
    }
  }

  public async update({params, response, request}) {
    const id = parseInt(params.id);

    const category = await Category.find(id);


    if(category) {
      const name = request.input("name")
      const title = request.input("title")

      if(!name || !title) {
        response.status(500)
        return {
          message: "Fill all fields"
        }
      }

      category.name = request.input("name");

      category.title = request.input("title");

      category.description = request.input("description");

      await category.save()

      return {
        data: category,
        message: "success",
        success: true
      }
    } else {
      response.status(404)
      return {
        message: "Category not found"
      }
    }
  }

  public async delete({params, response}) {
    const id = parseInt(params.id);

    const category = await Category.find(id);

    if(category) {
      category.delete();

      return {
        data: [],
        message: "success",
        success: true
      }
    } else {
      response.status(404)
      return {
        message: "Category not found"
      }
    }
  }
}
