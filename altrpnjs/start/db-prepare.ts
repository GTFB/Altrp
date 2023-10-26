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
console.log('Starting DB prepare')
AltrpMeta.firstOrCreate({
  meta_name: 'altrp_themes'
}).then((meta)=>{
  if(! meta.meta_value){
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
}).catch(e=>{
  console.error(e)
})
