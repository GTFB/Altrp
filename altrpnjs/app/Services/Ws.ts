import {Server, Socket} from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import User from "App/Models/User";
import Role from "App/Models/Role";
import _ from "lodash";
import Logger from "@ioc:Adonis/Core/Logger";


class Ws {
  public io: Server
  private booted = false
  public clients: {} = {}

  public boot() {
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new Server(AdonisServer.instance!, {
      path: '/wsaltrp',
      cors: {
        origin: '*'
      }
    })
  }

  async pushClient(client: Socket) {
    const guid = client.handshake.auth.key;

    if(!guid) {
      return
    }

    if(!this.clients[guid]) {
      const user = await User.query().where("guid", guid).preload("roles").first();

      if(!user) {
        this.clients[guid] = {
          is_guest: true,
          sockets: [client]
        }


        return guid
      } else {
        this.clients[guid] = {
          user,
          sockets: [client]
        }

        return client.handshake.auth.key
      }

    } else {
      this.clients[guid].sockets.push(client)
    }
  }

  removeClient(guid: string, socket: Socket) {
    let list = this.clients[guid]
    if(! list){
      return
    }
    let sockets = list.sockets
    sockets = sockets.filter(_s => _s !== socket)
    if(! sockets.length){
      delete this.clients[guid]
    } else {
      this.clients[guid].sockets = sockets
    }
    let _c:any = []
    for(let k in this.clients){
      if(this.clients.hasOwnProperty(k) && _.isArray(this.clients[k].sockets)){
        this.clients[k].sockets.forEach(s => _c.push(s))
      }
    }
    if(_c.length){
      Logger.info('WS Clients count: ' + _c.length || '0');
    }
  }

  emitAdmin(type, data) {
    this.emitToRole(type, data, "admin")
  }

  async emitToRole(type, data, role: string) {
    const roleValue = await Role.query().where("name", role).preload("users").firstOrFail();

    roleValue.users.forEach(user => {
      if(this.clients[user.guid]) {
        this.clients[user.guid].sockets.forEach((socket) => {
          socket.send({
            data,
            type
          })
        })
      }
    })
  }

  sendMessage(type, data, guid: string) {
    if(this.clients[guid]) {
      this.clients[guid].sockets.forEach((socket) => {
        socket.send({
          type,
          data
        })
      })
    }
  }
}

export default new Ws()
