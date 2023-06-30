import { DateTime } from 'luxon';
import {BaseModel, ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import * as _ from 'lodash'

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel> | [ModelQueryBuilderContract<typeof BaseModel>, ModelQueryBuilderContract<typeof BaseModel>]) => {
  if(_.isArray(query)){
    query[0].whereNull('deleted_at')
    query[1].whereNull('deleted_at')
  } else {
    query.whereNull('deleted_at')
  }
}
export const softDelete = async (instance) => {
  // @ts-ignore
  instance.deleted_at = DateTime.local();
  // @ts-ignore
  instance.deletedAt = DateTime.local();
  // @ts-ignore
  await instance.save();
}

export const beforePaginateQuery = (
  [countQuery, query]: [ModelQueryBuilderContract<typeof BaseModel>, ModelQueryBuilderContract<typeof BaseModel>]
) =>{
  countQuery.whereNull('deleted_at')
  query.whereNull('deleted_at')
}
