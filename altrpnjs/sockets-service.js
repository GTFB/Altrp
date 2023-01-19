"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const standalone_1 = require("@adonisjs/core/build/standalone");
const axios = require("axios");
const application = new standalone_1.Ignitor(__dirname)
  .application();
application.start().then(async () => {
  await application.setup();
  await application.registerProviders();
  await application.bootProviders();
  await application.requirePreloads();
  const Env = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env")).default;
  const AltrpSocket = __importDefault(global[Symbol.for('ioc.use')]("App/Services/AltrpSocket")).default;
  try {
    if (await axios.get(`http://${Env.get('HOST')}:${Env.get('SOCKET_PORT', 22045)}`)) {
      console.log('socket stopped');
      return;
    }
  }
  catch (e) {
    if(e.response?.data){
      console.log('socket stopped');
      return
    }
  }
  Env.set('SOCKET_SERVICE', true);
  const applyPluginsFiltersAsync = require("./helpers/plugins/applyPluginsFiltersAsync").default;
  const httpServer = require('http').createServer();
  const io = new (require('socket.io')).Server(httpServer, {
    path: '/',
    cors: {
      origin: '*'
    }
  });
  httpServer.listen(Env.get('SOCKET_PORT', 22045), Env.get('HOST'));
  io.on('connection', async (socket) => {
    const isRobot = require("./helpers/sockets/isRobot").default;

    if (isRobot(socket)) {
      socket.disconnect();
      return;
    }
    applyPluginsFiltersAsync('after_socket_connect', socket);
    socket.on("message", (message) => {
      if (message === "altrp-front-load") {
        socket.send("altrpe");
      }
      else {
        applyPluginsFiltersAsync("socket_receive_message", message, socket);
      }
    });
    const guid = await AltrpSocket.pushClient(socket);
    socket.on("disconnect", () => {
      AltrpSocket.removeClient(guid, socket);
    });
    socket.on("error", (e) => {
      AltrpSocket.removeClient(guid, socket);
      console.log('SOCKET SERVER ERROR', e);
    });
  });
});
