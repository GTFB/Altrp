import View from '@ioc:Adonis/Core/View'
import get_logo_url from "../helpers/get_logo_url";
import getLocale from "../helpers/getLocale";
import print_statics from "../helpers/print_statics";
import config from "../helpers/config";
import get_altrp_setting from "../helpers/get_altrp_setting";
import getFavicons from "../helpers/getFavicons";


View.global('get_logo_url', get_logo_url)
View.global('getLocale', getLocale)
View.global('config', config)
View.global('print_statics', print_statics)
View.global('get_altrp_setting', get_altrp_setting)
View.global('getFavicons', getFavicons)


// let data = [
//   {
//     value: 7,
//     parent: 6,
//   },
//   {
//     value: 1,
//     parent: 2,
//   },
//   {
//     value: 2,
//     parent: 465456,
//   },
//   {
//     value: 8,
//     parent: 465456,
//   },
//   {
//     value: 3,
//     parent: 2,
//   },
//   {
//     value: 4,
//     parent: 2,
//   },
//   {
//     value: 5,
//     parent: 2,
//   },
//   {
//     value: 6,
//     parent: 4,
//   },
// ];
//
// let _data = [...data];
//
// _data.forEach(item => {
//   item["childNodes"] = [];
//   _data.forEach(_i=>{
//     if(_i.parent === item.value){
//       item["childNodes"].push(_i)
//     }
//   })
// })
//
// _data = _data.filter(item=>{
//   return ! data.find(_i=>{
//     return _i.value === item.parent
//   })
// })
//
//
// console.log(JSON.stringify(_data, null,' '));
