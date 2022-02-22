import Ws from 'App/Services/Ws'
Ws.boot()

Ws.io.on("connection", async (socket) => {
  const guid = await Ws.pushClient(socket)

  socket.on("disconnect", () => {
    Ws.removeClient(guid, socket)
  })

  socket.on("message", (message) => {
  })
})
