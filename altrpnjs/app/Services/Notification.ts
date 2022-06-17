import User from "App/Models/User";
import AltrpSocket from "./AltrpSocket"

export default class Notification {
  data;
  message;

  constructor(message, messageData) {
    this.message = message

    this.data = messageData;
  }

  send(users: User[], ) {
    switch (this.data.channel) {
      case "broadcast":
        users.forEach((user) => {
          AltrpSocket.sendMessage("notification", this.message.content, user.guid)
        })
        break
      case "telegram":
        // TelegramBot.init(null)
        break
    }
  }
}
