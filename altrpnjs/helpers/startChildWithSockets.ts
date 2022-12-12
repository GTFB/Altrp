import {exec} from "child_process";
import base_path from "./path/base_path";
import env from "./env";
import axios from "axios";

export default async function startChildWithSockets(){
  if(env('CLUSTER') != 'true'){
    return
  }
  try {
    await axios.get(`http://${env('HOST')}:${env('SOCKET_PORT', 22045)}`)
  }catch (e) {
    console.error(e);
    console.log('Starting Socket Service');
    // @ts-ignore
    exec(`node ${base_path('sockets-service.js')} `, (err, stdout, stderr) => {
      if(err){
        console.error('SOCKET SERVICE ERROR:');
        console.error(err);
        console.log(stderr);
      }

    })
  }
}
