import isRobot from "../helpers/sockets/isRobot";
import AltrpSocket from "App/Services/AltrpSocket";
import applyPluginsFiltersAsync from "../helpers/plugins/applyPluginsFiltersAsync";

AltrpSocket.boot();

AltrpSocket.io.on("connection", async (socket) => {
  console.log("check is robot");
  if (isRobot(socket)) {
    socket.disconnect();
    console.log("robot");
    return;
  }
  console.log("not robot");

  applyPluginsFiltersAsync("after_socket_connect", socket);
  socket.on("message", (message) => {
    console.log(message, "message");
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
