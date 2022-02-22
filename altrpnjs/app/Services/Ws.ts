import {Server, Socket} from 'socket.io'
import Env from "@ioc:Adonis/Core/Env";
import AdonisServer from '@ioc:Adonis/Core/Server'
import User from "App/Models/User";
import {awaitExpression} from "@babel/types";
import Role from "App/Models/Role";

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
      cors: {
        origin: '*'
      }
    })

    this.io.listen(Env.get('SOCKET_PORT'))
  }

  async pushClient(client: Socket) {
    const guid = client.handshake.auth.key;

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
  }

  emitAdmin(type, data) {
    // this.adminClients.forEach((admin) => {
    //   this.io.emit(admin.socket.handshake.auth.key, data)
    // })

    this.emitToRole(type, data, "admin")
  }

  // addToRoles(client) {
  //   if(client.is_guest) {
  //     this.clientsByRoles.guests[client.sockets[0].handshake.auth.key] = client;
  //   } else {
  //     client.user.roles.forEach(role => {
  //       if(!this.clientsByRoles[role.name]) {
  //         this.clientsByRoles[role.name] = {}
  //       }
  //       this.clientsByRoles[role.name][client.sockets[0].handshake.auth.key] = client
  //       console.log(this.clientsByRoles.admin['47564cbc-304c-4941-9c8c-7d4cad66b613'].sockets.length)
  //     })
  //   }
  // }

  async emitToRole(type, data, role: string) {
    const roleValue = await Role.query().where("name", role).preload("users").firstOrFail();

    roleValue.users.forEach(user => {
      if(this.clients[user.guid]) {
        this.clients[user.guid].sockets.forEach((socket) => {
          socket.emit(user.guid, {
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
        socket.emit({
          type,
          data
        })
      })
    }
  }
}

export default new Ws()
