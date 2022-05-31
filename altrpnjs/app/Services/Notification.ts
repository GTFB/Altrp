import User from "App/Models/User";
import Ws from "./Ws"
import TelegramBot from "App/Services/TelegramBot";

export default class Notification {
  data;
  message;

  constructor(message, messageData) {
    this.message = message

    this.data = messageData;
  }

  send(users: User[], customizerData) {
    switch (this.data.channel) {
      case "broadcast":
        users.forEach((user) => {
          Ws.sendMessage("notification", this.message.content, user.guid)
        })
        break
      case "telegram":
        // TelegramBot.init(null)
        break
    }
  }
}
