import loadPluginsHelpers from "./js/plugins/loadPluginsHelpers";
import elementsHandler from "./js/functions/interactions/elementsHandler";
window.altrp.loadPluginsHelpers = loadPluginsHelpers
console.log('FIRST SCRIPT: ', performance.now());

if(! window.asCheck){
  import('./_h-altrp.js')
}

document.addEventListener('DOMContentLoaded',()=>{
  if(! window.asCheck){
    document.addEventListener('html-render',elementsHandler)
    const HtmlRenderEvent = new Event('html-render')
    document.dispatchEvent(HtmlRenderEvent)
  }
  import('./js/helpers/dataRevealElements').then(cb=>cb.default())
  if(document.querySelector('[data-async-content-load]')){
    import('./js/helpers/dataAsyncContentLoad').then(cb=>cb.default())
  }
})
if(document.querySelector('a[href]')){
  import('./js/functions/events-handlers/document-click')
}
