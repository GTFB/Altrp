
export default function loadPageActions(){
  window.page_areas.forEach(area=>{
    if(_.isArray(area.templates)){
      area.templates.forEach((template = {})=>{
        doTemplateAction(template)
      })
    } else {
      doTemplateAction(area.template)
    }
  })
}

/**
 *
 * @param {{}} templateData
 */
export function doTemplateAction(templateData = {}){
  const page_load_actions = _.get(templateData, 'data.settings.page_load_actions')
  const id = _.get(templateData, 'data.id')
  if(! _.isArray(page_load_actions)){
    return
  }

  let element
  import(/* webpackChunkName: 'FrontElement' */'../../classes/FrontElement').then(module=>{
    const FrontElement = module.default
    element = new FrontElement(templateData.data, true)
    return import(
      /* webpackChunkName: 'ActionsManager' */
      "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
    )
  })
  .then(module=>{
    window.actionsManager.callAllWidgetActions(
      element.getIdForAction(),
      "page-load",
      page_load_actions,
      element
    )
  })

}
