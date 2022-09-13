import { DateTime } from 'luxon';
import {BaseModel, ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}
export const softDelete = async (instance) => {
  // @ts-ignore
  instance.deleted_at = DateTime.utc();
  // @ts-ignore
  await instance.save();
}
