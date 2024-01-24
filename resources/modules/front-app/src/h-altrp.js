console.log('FIRST SCRIPT: ', performance.now());
const _subscribers = []
window.appStoreSubscribe = function (callback){
  _subscribers.push(callback)
}

if(!window.asCheck){

  Promise.all([
    import(/* webpackChunkName: 'loadPluginsHelpers' */"./js/plugins/loadPluginsHelpers"),
    import(/* webpackChunkName: 'elementsHandler' */"./js/functions/interactions/elementsHandler"),
  ]).then(res=>{
    const [loadPluginsHelpers, elementsHandler] = res
    window.altrp.loadPluginsHelpers = loadPluginsHelpers.default
    document.addEventListener('html-render',elementsHandler.default)
    const HtmlRenderEvent = new Event('html-render')
    document.dispatchEvent(HtmlRenderEvent)
  })
  /**
   * events handlers
   */
  import(/* webpackChunkName: 'altrp-query-updated.js' */'./js/functions/altrp-query-updated')
  import(/* webpackChunkName: '_h-altrp.js' */'./_h-altrp.js')
}

document.addEventListener('DOMContentLoaded',()=>{
  if(! window.asCheck){
    import(/* webpackChunkName: 'dataRevealElements' */'./js/helpers/dataRevealElements').then(cb=>cb.default())
    if(document.querySelector('[data-async-content-load]')){
      import(/* webpackChunkName: 'dataAsyncContentLoad' */'./js/helpers/dataAsyncContentLoad').then(cb=>cb.default())
    }
  }
})
if(document.querySelector('a[href], [data-link]')){
  import(/* webpackChunkName: 'document-click' */'./js/functions/events-handlers/document-click')
}

function userInteraction(){
  document.dispatchEvent(new Event('user-interaction'))
  window.dispatchEvent(new Event('user-interaction'))
}
window.addEventListener(('user-interaction'), ()=>{
  if(window.altrp){
    let popups = altrp.popupsGuids
    if(popups){
      popups.forEach(p=>{
        const stylesUrl = `/altrp/css/DEFAULT_BREAKPOINT/${p}.css?${window.altrp.randomString}`
        if(document.querySelector(`link[href="${stylesUrl}"]`)){
          return
        }
        const link = document.createElement('link')
        link.setAttribute('href', stylesUrl)
        link.setAttribute('rel', 'stylesheet')
        document.body.appendChild(link)
      })
    }
  }
})
document.addEventListener('click', userInteraction)
document.addEventListener('focus', userInteraction)
document.addEventListener('mousedown', userInteraction)
document.addEventListener('mouseleave', userInteraction)
document.addEventListener('mouseenter', userInteraction)
document.addEventListener('touchend', userInteraction)
document.addEventListener('touchmove', userInteraction)
document.addEventListener('touchstart', userInteraction)
document.addEventListener('keydown', userInteraction)
document.addEventListener('keyup', userInteraction)
window.addEventListener('scroll', userInteraction)
