// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Page from 'App/Models/Page';
import Role from 'App/Models/Role';
import options from '../../../helpers/options';
import Permission from 'App/Models/Permission';
import Category from 'App/Models/Category';
import Menu from 'App/Models/Menu';
import Template from 'App/Models/Template';
import filtration from '../../../helpers/filtration';
import User from 'App/Models/User';
import Customizer from 'App/Models/Customizer';
import HttpContextContract from 'helpers/plugins/adonis-core/HttpContextContract';

export default class OptionsController {
  public async pages() {
    const pages = await Page.all();

    return options(pages, {
      value: 'id',
      label: 'title',
    });
  }

  public async roles() {
    const roles = await Role.all();

    return options(roles, {
      value: 'id',
      label: 'display_name',
    });
  }

  public async permissions() {
    const permissions = await Permission.all();

    return options(permissions, {
      value: 'id',
      label: 'display_name',
    });
  }

  public async categories() {
    const categories = await Category.all();

    return {
      data: options(categories, {
        value: 'id',
        label: 'title',
      }),
      message: 'success',
      success: true,
    };
  }

  public async users() {
    const users = await User.all();

    return options(users, {
      value: 'id',
      label: 'name',
    });
  }

  public async menus({ request }: HttpContextContract) {
    const menu = await Menu.all();
    let value = request.qs().value || 'id';
    return {
      data: options(menu, {
        value,
        label: 'name',
      }),
      message: 'success',
      success: true,
    };
  }

  public async customizers() {
    let customizers = await Customizer.query().preload('altrp_model');
    customizers = customizers.filter((customizer) => customizer.altrp_model);

    return customizers.map((page) => {
      //@ts-ignore
      page = page.serialize();

      return {
        value: page.guid,
        label: page.title,
      };
    });
  }

  public async templates({ request }) {
    const templatesQuery = Template.query().whereNot('type', 'review');

    filtration(templatesQuery, request, ['title']);

    const templates = await templatesQuery;

    return templates.map((template) => ({
      value: template.id,
      label: template.title,
    }));
  }

  public async popups({ request }) {
    const templatesQuery = Template.query()
      .whereNot('type', 'review')
      .whereHas('currentArea', (query) => {
        query.where('name', 'popup');
      });

    filtration(templatesQuery, request, ['title']);

    const templates = await templatesQuery;

    return templates.map((template) => ({
      value: template.id,
      label: template.title,
    }));
  }
}
