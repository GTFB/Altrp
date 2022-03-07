import { Server } from 'socket.io'

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

  }
}

export default new Ws()
