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
      if(route.id == parentId) {
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

  let currenRoute

  let models = []
  breadcrumbsClone.forEach((i,idx)=>{
    if(idx === 0){
      currenRoute = i
      let currentSegments = currenRoute.path.split('/')
      models = currentSegments.map(s=>{
        if(s.includes('|')){
          return window.altrpHelpers.getDataByPath(s.split('|')[0].replace(':', ''))
        }
        return null
      })
    } else {
      if(!i.path.includes(':')){
        return
      }
       i.path = i.path.split('/').map((segment, idx)=>{
        if(!segment.includes(':')){
          return segment
        }
        return location.pathname.split('/')[idx] || ''
      }).join('/')

      if(! i.title.includes('{{') && !i.title.includes('}}')){
        return;
      }

      const model = models?.[i.path.split('/').length - 1] || {}

      i.title = window.altrpHelpers.replaceContentWithData(i.title, model)
    }

  })
  items = breadcrumbsClone.reverse()
  if(window['h-altrp']){
    window.breadcrumbsItems = items;
  }
  return items;
}
