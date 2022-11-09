import isRobot from "../helpers/sockets/isRobot";
import AltrpSocket from "App/Services/AltrpSocket";
import applyPluginsFiltersAsync from "../helpers/plugins/applyPluginsFiltersAsync";

AltrpSocket.boot();

AltrpSocket.io?.on("connection", async (socket) => {
  if (isRobot(socket)) {
    socket.disconnect();
    return;
  }

  applyPluginsFiltersAsync("after_socket_connect", socket);
  socket.on("message", (message) => {
    if (message === "altrp-front-load") {
      socket.send("altrpe");
    } else {
      applyPluginsFiltersAsync("socket_receive_message", message, socket);
    }
  });

  const guid = await AltrpSocket.pushClient(socket);

  socket.on("disconnect", () => {
    AltrpSocket.removeClient(guid, socket);
  });
});
