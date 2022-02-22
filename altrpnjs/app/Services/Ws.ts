import { Server } from 'socket.io'
import Env from "@ioc:Adonis/Core/Env";

class Ws {
  public io: Server
  private booted = false

  public boot() {
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new Server(3000, {
      cors: {
        origin: '*'
      }
    })

    this.io.listen(Env.get('SOCKET_PORT'))
  }
}

export default new Ws()
