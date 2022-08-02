import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import Source from 'App/Models/Source';
import Model from 'App/Models/Model';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NotFoundException from 'App/Exceptions/NotFoundException';
import base_path from '../../helpers/path/base_path';
import * as _ from 'lodash';
import isProd from '../../helpers/isProd';

export default class Controller extends BaseModel {
  public static table = 'altrp_controllers';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public namespace: string;

  @column()
  public prefix: string;

  @column()
  public model_id: number;

  @belongsTo(() => Model, {
    foreignKey: 'model_id',
  })
  public altrp_model: BelongsTo<typeof Model>;

  @column()
  public description: string;

  @belongsTo(() => User, {
    foreignKey: 'author',
  })
  public user: BelongsTo<typeof User>;

  @hasMany(() => Source, {
    foreignKey: 'controller_id',
    localKey: 'id',
  })
  public sources: HasMany<typeof Source>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  static async callControllerMethod(
    modelId: number | Model | null,
    method: string,
    httpContext: HttpContextContract
  ): Promise<any> {
    let model;
    if (modelId instanceof Model) {
      model = modelId;
    } else {
      model = await Model.find(modelId);
    }
    if (!model) {
      throw new NotFoundException('Model not Found', 404, NotFoundException.code);
    }
    const controllerName = base_path(`/app/AltrpControllers/${model.name}Controller`);
    if (isProd()) {
      Object.keys(require.cache).forEach(function (key) {
        delete require.cache[key];
      });
    }
    let controller = isProd()
      ? new (require(controllerName).default)()
      : new (await import(controllerName)).default();
    if (!_.isFunction(controller[method])) {
      throw new NotFoundException('Model not Found', 404, NotFoundException.code);
    }
    return await controller[method](httpContext);
  }
}
