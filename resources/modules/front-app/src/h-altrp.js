import loadPluginsHelpers from "./js/plugins/loadPluginsHelpers";
window.altrp.loadPluginsHelpers = loadPluginsHelpers
console.log('FIRST SCRIPT: ', performance.now());

if(! window.asCheck){
  import('./_h-altrp.js')
}

document.addEventListener('DOMContentLoaded',()=>{
  import('./js/helpers/dataRevealElements').then(cb=>cb.default())
  if(document.querySelector('[data-async-content-load]')){
    import('./js/helpers/dataAsyncContentLoad').then(cb=>cb.default())
  }
})
if(document.querySelector('a[href]')){
  import('./js/functions/events-handlers/document-click')
}
