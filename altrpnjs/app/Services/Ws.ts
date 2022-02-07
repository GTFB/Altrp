import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
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
    console.log(AdonisServer.instance!)
    this.io.listen(Env.get('SOCKETS_KEY'))
  }
}

export default new Ws()
