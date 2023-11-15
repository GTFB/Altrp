/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import AltrpMeta from 'App/Models/AltrpMeta'
import Database from "@ioc:Adonis/Lucid/Database";
import guid from "../helpers/guid";
import Application from "@ioc:Adonis/Core/Application";

if (Application.environment === 'web') {
  console.log('Starting DB prepare')
  AltrpMeta.firstOrCreate({
    meta_name: 'altrp_themes'
  }).then((meta) => {
    if (!meta.meta_value) {
      meta.meta_value = [
        {
          title: 'Normal',
          name: 'altrp-theme_normal'
        },
        {
          title: 'Dark',
          name: 'altrp-theme_dark'
        },
      ]
      meta.save()

    }
  }).catch(e => {
    console.error(e)
  })


  Database.from('altrp_i18n').whereNull('guid').then(async i18ns => {
    for (const i18n of i18ns) {
      const q = Database.from('altrp_i18n').where(i18n).update({
        guid: guid(),
      })
      await q
    }
  }).catch(e => {
    console.error('error while prepare I18n DB', e)
  })

  let schema = Database.connection().schema
  schema.table('permission_role', table => {
    table.dropForeign('role_id')
    table.foreign('role_id').references('roles.id').onDelete('cascade').onUpdate('cascade')
  }).catch(() => {
    console.log('foreign key role_id exists')
  })
  schema = Database.connection().schema
  schema.table('permission_role', table => {
    table.dropForeign('permission_id')
    table.foreign('permission_id').references('permissions.id').onDelete('cascade').onUpdate('cascade')
  }).catch(() => {
    console.log('foreign key permission_id exists')
  })
  schema = Database.connection().schema
  schema.table('altrp_sources_permissions', table => {
    table.dropForeign('source_id')
    table.foreign('source_id').references('altrp_sources.id')
      .onDelete('cascade')
      .onUpdate('cascade')
  }).catch(() => {
    console.log('foreign key altrp_sources_permissions exists')
  })
  schema = Database.connection().schema
  schema.table('pages', table=>{
    // @ts-ignore
    table.unique('guid')
  }).catch(() => {
    //console.log('unique pages error')
  })

}
