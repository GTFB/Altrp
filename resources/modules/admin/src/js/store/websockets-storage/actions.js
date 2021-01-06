export const WEBSOCKETS_SERVER_ENABLED = 'WEBSOCKETS_SERVER_ENABLED';

export function setWebsocketsEnabled(item){
  return { type: WEBSOCKETS_SERVER_ENABLED, item }
}
