import Ws from 'App/Services/Ws'
import getSocketUser from "../helpers/getSocketUser";
import isRobot from "../helpers/sockets/isRobot";

Ws.boot()

Ws.io.on("connection", async (socket) => {
  if(isRobot(socket)){
    socket.disconnect()
  }
  socket.on("message", (message) => {
    if(message === 'altrp-front-load'){
      socket.send('altrpe')
    }
  })
  if(getSocketUser(socket)) {
    const guid = await Ws.pushClient(socket)
    socket.on("disconnect", () => {
      Ws.removeClient(guid, socket)
    })
  }
})
