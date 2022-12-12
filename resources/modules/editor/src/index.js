import '../../front-app/src/js/libs/blueprint'
import '../../front-app/src/js/libs/blueprint-select'
import '../../front-app/src/js/libs/blueprint-datetime'
import '../../front-app/src/js/libs/blueprint-popover'
import '../../front-app/src/js/libs/react-lodash'
import '../../front-app/src/js/libs/ckeditor'
import '../../front-app/src/js/libs/altrp'
import '../../front-app/src/js/libs/moment'
import '../../front-app/src/js/libs/template-loader'
import '../../front-app/src/js/libs/fullcalendar'
import '../../front-app/src/js/libs/image-crop'
import '../../front-app/src/js/libs/reacket'
import {createGlobalStyle} from 'styled-components'
import _ from "lodash";
window._ = _;

/**
 * For plugins
 * @type {{}}
 */
window.editorAPI = window.editorAPI || {}
/**
 *
 * @type {*|{}}
 */
window.editorAPI.components = window.editorAPI.components || {
  createGlobalStyle: createGlobalStyle
}

/**
 *
 * @type {Object<string, {
 *   priority: number | string,
 *   callback: function
 * }[]>}
 * }
 */
window.editorAPI.syncFilters = window.editorAPI.syncFilters || {}
/**
 *
 * @type {Object<string, {
 *   priority: number | string,
 *   callback: Function
 * }[]>}
 * */
window.editorAPI.asyncFilters = window.editorAPI.asyncFilters || {}
/**
 *
 * @param {string} type
 * @param {*} content
 * @param params
 * @returns {Promise<*>}
 */
window.editorAPI.applyPluginsFiltersAsync = async (type, content = null, ...params) => {
  if(! type){
    return content
  }
  //console.log(`Async Filter '${type}' applying!`);
  /**
   *
   * @type {{
   *   priority: number | string,
   *   callback: Function
   * }[]} filter
   * */
  let filter = window.editorAPI.asyncFilters[type]
  if(! _.isArray(filter)){
    return content
  }
  filter = _.sortBy(filter, i=>(i.priority || 10))
  await Promise.all(filter.map(async i=>{
    if(_.isFunction(i.callback)){
      content = await i.callback(content, ...params)
    }
  }))
  return content
}

/**
 *
 * @param {string} type
 * @param {*} content
 * @param params
 * @returns {*}
 */
window.editorAPI.applyPluginsFiltersSync = (type, content = null, ...params) => {
  if(! type){
    return content
  }
  //console.log(`Sync Filter '${type}' applying!`);
  /**
   *
   * @type {{
   *   priority: number | string,
   *   callback: Function
   * }[]} filter
   * */
  let filter = window.editorAPI.syncFilters[type]
  if(! _.isArray(filter)){
    return content
  }
  filter = _.sortBy(filter, i=>(i.priority || 10))
  filter.forEach(i=>{
    if(_.isFunction(i.callback)){
      content = i.callback(content, ...params)
    }
  })
  return content
}

window.editorAPI.applyPluginsFiltersAsync('before_editor_render', '').then(()=>{
  return import('./installing')
}).then(()=>{
  return import('./_index')
})
