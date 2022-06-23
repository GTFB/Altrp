import {io} from "socket.io-client";
console.log('FIRST SCRIPT: ', performance.now());

window.altrpIo = io( {
  path: '/wsaltrp',
  auth: {
  },
})
window.altrpIo.on("message", (data) => {
  if(data === 'altrpe'){
    import('./_h-altrp')
    console.log('SOCKET IO CONNECTED: ', performance.now());
    window.altrpIo.disconnect()
  }
})
window.altrpIo.on("connect_error", (data) => {
  import('./_h-altrp')
  window.altrpIo.disconnect()

})
window.altrpIo.send('altrp-front-load')
document.addEventListener('DOMContentLoaded',()=>{
  import('./js/helpers/dataRevealElements').then(cb=>cb.default())
})
