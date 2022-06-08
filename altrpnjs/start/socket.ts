import Ws from 'App/Services/Ws'
import getSocketUser from "../helpers/getSocketUser";

Ws.boot()

Ws.io.on("connection", async (socket) => {
  if(getSocketUser(socket)) {
    const guid = await Ws.pushClient(socket)

    socket.on("disconnect", () => {
      console.log('disconnect');
      Ws.removeClient(guid, socket)
    })

    socket.on("message", (message) => {
      if(message === 'altrp-front-load'){
        socket.send('altrpe')
      }
    })
  }
})
