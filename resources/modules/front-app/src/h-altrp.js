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
    window.altrpIo.disconnect()
  }
})
window.altrpIo.on("connect_error", (e) => {
  import('./_h-altrp')
  window.altrpIo.disconnect()
  console.error(e);
})
window.altrpIo.send('altrp-front-load')
