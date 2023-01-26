console.log('FIRST SCRIPT: ', performance.now());

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
