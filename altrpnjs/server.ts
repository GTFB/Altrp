/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata';
import sourceMapSupport from 'source-map-support';
import { Ignitor } from '@adonisjs/core/build/standalone';

sourceMapSupport.install({ handleUncaughtExceptions: false });

new Ignitor(__dirname).httpServer().start();

// for https tests
// if you use windows open git terminal
// and write:
// openssl genrsa -out key.pem
// openssl req -new -key key.pem -out csr.pem
// openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
// rm csr.pem
// you will get key.pem and cert.pem files
// drop in altrpnjs directory
// done

// import { createServer } from "https";
// import { Ignitor } from "@adonisjs/core/build/src/Ignitor";
// import fs from "fs";
//
// new Ignitor(__dirname).httpServer().start((handle) => {
//   return createServer(
//     {
//       key: fs.readFileSync('key.pem'),
//       cert: fs.readFileSync('cert.pem')
//     },
//     handle
//   );
// });
