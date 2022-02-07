import Ws from 'App/Services/Ws'
Ws.boot()

Ws.io.on("connection", (socket) => {
  socket.on("news", (data) => {
    console.log(data, "asdsa")
  })
})
