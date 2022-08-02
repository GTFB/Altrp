import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Category from 'App/Models/Category';
import { v4 as uuid } from 'uuid';
import LIKE from '../../../../helpers/const/LIKE';

export default class CategoriesController {
  async index({ response, request }: HttpContextContract) {
    const params = request.qs();
    const page = parseInt(params.page) || 1;
    const pageSize = parseInt(params.pageSize) || 10;
    const searchWord = params.s;
    let categories;

    if (searchWord) {
      categories = await Category.query()
        .orWhere('name', LIKE, `%${searchWord}%`)
        .orWhere('title', LIKE, `%${searchWord}%`)
        .orWhere('description', LIKE, `%${searchWord}%`)
        .orderBy('title')
        .paginate(page, pageSize);
    } else {
      categories = await Category.query().orderBy('title').paginate(page, pageSize);
    }

    return response.json({
      categories: categories.all(),
      count: categories.getMeta().total,
      pageCount: categories.getMeta().last_page,
    });
  }

  public async create({ request, response }) {
    const name = request.input('name');
    const guid = uuid();
    const description = request.input('description');
    const title = request.input('title');

    if (!name || !title) {
      response.status(500);
      return {
        message: 'Fill all fields',
      };
    }

    const category = await Category.create({
      name,
      guid,
      description,
      title,
    });

    return {
      data: category,
      message: 'success',
      success: true,
    };
  }

  public async show({ params, response }) {
    const id = parseInt(params.id);

    const category = await Category.find(id);

    if (category) {
      return {
        data: category,
        message: 'success',
        success: true,
      };
    } else {
      response.status(404);
      return {
        message: 'Category not found',
      };
    }
  }

  public async update({ params, response, request }) {
    const id = parseInt(params.id);

    const category = await Category.find(id);

    if (category) {
      const name = request.input('name');
      const title = request.input('title');

      if (!name || !title) {
        response.status(500);
        return {
          message: 'Fill all fields',
        };
      }

      category.name = request.input('name');

      category.title = request.input('title');

      category.description = request.input('description');

      await category.save();

      return {
        data: category,
        message: 'success',
        success: true,
      };
    } else {
      response.status(404);
      return {
        message: 'Category not found',
      };
    }
  }

  public async delete({ params, response }) {
    const id = parseInt(params.id);

    const category = await Category.find(id);

    if (category) {
      category.delete();

      return {
        data: [],
        message: 'success',
        success: true,
      };
    } else {
      response.status(404);
      return {
        message: 'Category not found',
      };
    }
  }

  async options({ response }: HttpContextContract) {
    let query = Category.query();
    let categories: any[] = await query.select({ label: 'title', value: 'guid' });
    categories = categories.map((category) => {
      return category.$extras;
    });
    return response.json({
      data: categories,
      success: true,
      message: 'success',
    });
  }
}
