import AltrpSocket from 'App/Services/AltrpSocket';

export default class Message {
  public receiver({ type, body, guid }) {
    AltrpSocket.sendMessage(type, body, guid);
  }
}
