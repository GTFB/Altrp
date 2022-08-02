// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Robot from 'App/Models/Robot';
import { v4 as uuid } from 'uuid';
import Category from 'App/Models/Category';
import CategoryObject from 'App/Models/CategoryObject';
import LIKE from '../../../helpers/const/LIKE';

export default class RobotsController {
  public async index({ request }) {
    const params = request.qs();
    const page = parseInt(params.page) || 1;
    const pageSize = params.pageSize || 20;
    const searchWord = params.s;
    let robots;

    if (searchWord) {
      robots = await Robot.query()
        .orWhere('name', LIKE, `%${searchWord}%`)
        .orWhere('chart', LIKE, `%${searchWord}%`)
        .preload('user')
        .preload('categories')
        .paginate(page, pageSize);
    } else {
      robots = await Robot.query().preload('user').preload('categories').paginate(page, pageSize);
    }

    return robots.all().map((robot) => {
      const data = {
        author: robot.user.name,
        ...robot.serialize(),
        categories: robot.categories.map((category) => {
          return category;
        }),
        count: robots.getMeta().total,
        pageCount: robots.getMeta().last_page,
      };

      return data;
    });
  }

  public async update({ request, params }) {
    const robot = await Robot.query().where('id', parseInt(params.id)).firstOrFail();

    const enabled = request.input('power');

    robot.enabled = !!enabled;

    return await robot.save();
  }

  public async create({ request, auth, response }) {
    await auth.use('web').authenticate();

    const user_id = auth.user.id;
    const name = request.input('name');
    let categories = request.input('categories');

    const robot = await Robot.create({
      name,
      user_id,
      guid: uuid(),
    });

    for (const option of categories) {
      const category = await Category.query().where('guid', option.value).first();

      if (!category) {
        response.status(404);
        return {
          message: 'Category not Found',
        };
      } else {
        await CategoryObject.create({
          category_guid: category.guid,
          object_type: 'Robot',
          object_guid: robot.guid,
        });
      }
    }

    return {
      redirect_route: `/admin/robots-editor?robot_id=${robot.id}`,
      success: true,
    };
  }

  public async delete({ params }) {
    const robot = await Robot.query().where('id', parseInt(params.id)).firstOrFail();

    if (robot) {
      await robot.related('categories').detach();
      robot.delete();

      return {
        success: true,
      };
    }
  }
}
