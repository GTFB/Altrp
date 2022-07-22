import {io} from "socket.io-client";
import loadPluginsHelpers from "./js/plugins/loadPluginsHelpers";
window.altrp.loadPluginsHelpers = loadPluginsHelpers
console.log('FIRST SCRIPT: ', performance.now());

window.altrpIo = io( {
  path: '/wsaltrp',
  auth: {
  },
})
window.altrpIo.send('altrp-front-load')

function loadFrontApp(){
  if(window.__altrpLoading){
    return
  }
  window.__altrpLoading = true
  import('./_h-altrp')
  window.altrpIo.disconnect()

  if(document.querySelector('[data-async-content-load]')){
    import('./js/helpers/dataAsyncContentLoad').then(cb=>cb.default())
  }

}
window.altrpIo.on("connect_error", error=>{
  console.error(error);
  loadFrontApp()
})
window.altrpIo.on("message", loadFrontApp)

document.addEventListener('DOMContentLoaded',()=>{
  import('./js/helpers/dataRevealElements').then(cb=>cb.default())
})
