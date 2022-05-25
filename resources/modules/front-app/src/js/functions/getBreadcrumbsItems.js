import isEditor from "./isEditor";

/**
 *
 * @return {*[]}
 */
export default function getBreadcrumbsItems(){
  if(window['h-altrp'] && window.breadcrumbsItems){
    return window.breadcrumbsItems;
  }
  let items = [];
  if(isEditor(0)){
    return items;
  }
  const currentId = window['h-altrp'] ? window.page_id : window.currentPageId
  const {routes} = appStore.getState().appRoutes
  let breadcrumbsClone = [];
  let idCurrent = 0;
  routes.forEach((route, idx) => {
    if(currentId === route.id) {
      idCurrent = idx
    }
  })

  breadcrumbsClone.push(routes[idCurrent])

  function getParent(parentId) {
    routes.forEach(route => {
      if(route.id === parentId) {
        breadcrumbsClone.push(route)
        if(route.parent_page_id) {
          getParent(route.parent_page_id)
        }
      }
    })
  }

  if(routes[idCurrent].parent_page_id) {
    getParent(routes[idCurrent].parent_page_id)
  }

  items = breadcrumbsClone.reverse()
  if(window['h-altrp']){
    window.breadcrumbsItems = items;
  }
  return items;
}
