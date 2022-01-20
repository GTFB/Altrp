// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Permission from "App/Models/Permission";

export default class PermissionsController {

  public async create({request}) {
    const permission = await Permission.create({
      description: request.input("description") || "",
      name: request.input("name"),
      display_name: request.input("display_name")
    })

    return permission
  }

  public async index({request}) {

    const params = request.qs();
    const page = parseInt(params.page) || 1

    const permissions = await Permission.query().paginate(page, 20)

    return {
      count: permissions.getMeta().total,
      pageCount: permissions.getMeta().last_page,
      permissions: permissions.all()
    }
  }

  public async delete({params}) {
    const permission = await Permission.query()
      .where("id", parseInt(params.id))
      .firstOrFail();

    await permission.delete();

    return {
      success: true
    }
  }

  public async show({params}) {
    const permission = await Permission.query()
      .where("id", parseInt(params.id))
      .firstOrFail();

    return permission
  }

  public async update({ params, request, response}) {
    const permission = await Permission.find(parseInt(params.id));

    const data = request.body();

    if(permission) {
      permission.display_name = data.display_name;
      permission.name = data.name;
      permission.description = data.description

      if(!await permission.save()) {
        response.status(500)
        return {
          message: "Permission not updated"
        }
      }

      return permission.serialize()
    } else {
      response.status(404)
      return {
        message: "Role not Found"
      }
    }
  }
}
