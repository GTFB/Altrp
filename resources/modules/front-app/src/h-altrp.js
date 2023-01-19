console.log('FIRST SCRIPT: ', performance.now());

if(!window.asCheck){
  Promise.all([
    import("./js/plugins/loadPluginsHelpers"),
    import("./js/functions/interactions/elementsHandler"),
  ]).then(res=>{
    const [loadPluginsHelpers, elementsHandler] = res
    window.altrp.loadPluginsHelpers = loadPluginsHelpers.default
    document.addEventListener('html-render',elementsHandler.default)
    const HtmlRenderEvent = new Event('html-render')
    document.dispatchEvent(HtmlRenderEvent)
  })
  import('./_h-altrp.js')
}

document.addEventListener('DOMContentLoaded',()=>{
  if(! window.asCheck){
    import('./js/helpers/dataRevealElements').then(cb=>cb.default())
    if(document.querySelector('[data-async-content-load]')){
      import('./js/helpers/dataAsyncContentLoad').then(cb=>cb.default())
    }
  }
})
if(document.querySelector('a[href], [data-link]')){
  import('./js/functions/events-handlers/document-click')
}
