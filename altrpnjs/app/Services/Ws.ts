import { Server } from 'socket.io'
import Env from "@ioc:Adonis/Core/Env";
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
  public io: Server
  private booted = false

  public boot() {
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: '*'
      }
    })

    this.io.listen(Env.get('SOCKET_PORT'))
  }
}

export default new Ws()
