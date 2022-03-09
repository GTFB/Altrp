import Ws from "App/Services/Ws";

export default class Message {
  public receiver({ type, body, guid }) {
    Ws.sendMessage(type, body, guid)
  }
}
