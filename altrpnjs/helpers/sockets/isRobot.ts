import {Socket, } from "socket.io";
const robots = [
  'ngdomPageSpeed',
  'ghthouse',
  'TST/',
];
export default function isRobot(socket: Socket): boolean {
  let headers:  any= socket?.handshake?.headers;
  headers = JSON.stringify(headers);
  for (let robot of robots){
    if(headers.indexOf(robot) > -1){
      return true
    }
  }
  return false
}
