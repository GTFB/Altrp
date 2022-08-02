// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Role from 'App/Models/Role';
import LIKE from '../../../../helpers/const/LIKE';

export default class RolesController {
  public async create({ request }) {
    const role = await Role.create({
      description: request.input('description') || '',
      name: request.input('name'),
      display_name: request.input('display_name'),
    });

    return role;
  }

  public async index({ request }) {
    const params = request.qs();
    const page = parseInt(params.page) || 1;
    const searchWord = params.s;
    let roles;

    if (searchWord) {
      roles = await Role.query()
        .orWhere('name', LIKE, `%${searchWord}%`)
        .orWhere('display_name', LIKE, `%${searchWord}%`)
        .paginate(page, 20);
    } else {
      roles = await Role.query().paginate(page, 20);
    }

    return {
      count: roles.getMeta().total,
      pageCount: roles.getMeta().last_page,
      roles: roles.all(),
    };
  }

  public async delete({ params }) {
    const role = await Role.query().where('id', parseInt(params.id)).firstOrFail();

    await role.delete();

    return {
      success: true,
    };
  }

  public async show({ params }) {
    const role = await Role.query().where('id', parseInt(params.id)).firstOrFail();

    return role;
  }

  public async update({ params, request, response }) {
    const role = await Role.find(parseInt(params.id));

    const data = request.body();

    if (role) {
      role.display_name = data.display_name;
      role.name = data.name;
      role.description = data.description;

      if (!(await role.save())) {
        response.status(500);
        return {
          message: 'Role not updated',
        };
      }

      return role.serialize();
    } else {
      response.status(404);
      return {
        message: 'Role not Found',
      };
    }
  }
}
