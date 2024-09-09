import { DateTime } from 'luxon';
import {BaseModel, ModelQueryBuilderContract, } from "@ioc:Adonis/Lucid/Orm";
import * as _ from 'lodash'
import Database from "@ioc:Adonis/Lucid/Database";

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel> | [ModelQueryBuilderContract<typeof BaseModel>, ModelQueryBuilderContract<typeof BaseModel>]) => {
  if(_.isArray(query)){
    query[0].whereNull('deleted_at')
    query[1].whereNull('deleted_at')
  } else {
    query.whereNull('deleted_at')
  }
}
export const softDelete = async (instance) => {

  const Model = instance.constructor;
  await Model.$hooks.exec('before', 'delete', instance);

  await  Database
    .from(Model.table) // Название таблицы из переменной
    .where('id', instance.id) // Поиск по колонке id
    .update({ deleted_at: DateTime.local() }) // Обновление значения deleted_at

  await Model.$hooks.exec('after', 'delete', instance);

}

export const beforePaginateQuery = (
  [countQuery, query]: [ModelQueryBuilderContract<typeof BaseModel>, ModelQueryBuilderContract<typeof BaseModel>]
) =>{
  countQuery.whereNull('deleted_at')
  query.whereNull('deleted_at')
}
