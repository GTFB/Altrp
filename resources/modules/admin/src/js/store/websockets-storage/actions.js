export const WEBSOCKETS_SERVER_ENABLED = 'WEBSOCKETS_SERVER_ENABLED';
export const WEBSOCKETS_SERVER_KEY = 'WEBSOCKETS_SERVER_KEY';
export const WEBSOCKETS_SERVER_PORT = 'WEBSOCKETS_SERVER_PORT';

export function setWebsocketsEnabled(item){
  return { type: WEBSOCKETS_SERVER_ENABLED, item }
}
export function setWebsocketsKey(item){
  return { type: WEBSOCKETS_SERVER_KEY, item }
}
export function setWebsocketsPort(item){
  return { type: WEBSOCKETS_SERVER_PORT, item }
}
