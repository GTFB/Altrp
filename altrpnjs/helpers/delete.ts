import { DateTime } from 'luxon';
import {BaseModel, LucidRow, ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}
export const softDelete = async (row: LucidRow, column: string = 'deletedAt') => {
  if(row[column]) {
    if(row[column].isLuxonDateTime) {
      row[column] = DateTime.local();
    } else {
      row[column] = true;
    }
    await row.save();
  }
}

export const forceDelete = async (row: LucidRow) => {
  try {
    await row.delete()

    return true
  } catch (e) {
    console.error(e)

    return false
  }
}
