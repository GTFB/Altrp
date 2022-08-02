import sessionConfig from 'Config/session';
import Encryption from '@ioc:Adonis/Core/Encryption';
import Request from '@ioc:Adonis/Core/Request';

const getSocketUser = (socket) => {
  // @ts-ignore
  const SocketRequest = new Request(socket.request, null, Encryption, {});
  const sessionId = SocketRequest.cookie(sessionConfig.cookieName);

  if (!sessionId) {
    return null;
  }
  const session = SocketRequest.encryptedCookie(sessionId);
  if (!session || !session.auth_web) {
    return null;
  }
  return session.auth_web;
};

export default getSocketUser;
