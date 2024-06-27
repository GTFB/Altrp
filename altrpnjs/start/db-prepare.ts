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
import Area from "App/Models/Area";
import Model from "App/Models/Model";

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
    //console.log('foreign key role_id exists')
  })
  schema = Database.connection().schema
  schema.table('permission_role', table => {
    table.dropForeign('permission_id')
    table.foreign('permission_id').references('permissions.id').onDelete('cascade').onUpdate('cascade')
  }).catch(() => {
    //console.log('foreign key permission_id exists')
  })
  schema = Database.connection().schema
  schema.table('altrp_sources_permissions', table => {
    table.dropForeign('source_id')
    table.foreign('source_id').references('altrp_sources.id')
      .onDelete('cascade')
      .onUpdate('cascade')
  }).catch(() => {
    //console.log('foreign key altrp_sources_permissions exists')
  })
  schema = Database.connection().schema
  schema.table('pages', table=>{
    // @ts-ignore
    table.unique('guid')
  }).catch(() => {
    //console.log('unique pages error')
  })
  schema = Database.connection().schema
  schema.table('page_permission', table=>{
    // @ts-ignore

    table.foreign('page_guid')
      .references('guid')
      .inTable('pages')
      .onUpdate('cascade')
      .onDelete('cascade')
  }).catch(() => {
    //console.log('foreign key page_permission exists')
  })




  const areas = [
    {
      name: "content",
      title: "Content",
      guid: guid(),
      settings: "[]"
    },
    {
      name: "header",
      title: "Header",
      guid: guid(),
      settings: "[]"
    },
    {
      name: "footer",
      title: "Footer",
      guid: guid(),
      settings: "[]"
    },
    {
      name: "card",
      title: "Card",
      guid: guid(),
      settings: "[]"
    },
    {
      name: "popup",
      title: "Popup",
      guid: guid(),
      settings: "[]"
    },
    {
      name: "mails",
      title: "Mails",
      guid: guid(),
      settings: "[]"
    },
  ]

  Area.fetchOrCreateMany('name', areas).catch(e=>{
    console.error(e)
  })

  Model.updateCustomModels().catch(e=>{
    console.error(e)
  })
}
