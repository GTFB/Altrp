const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.editor.common.js');
const fs = require('fs');
const http = require('http');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, "resources/modules/editor/public/"),
    port: 3000,
    publicPath: "http://127.0.0.1:3000/src/",
    hotOnly: true,
    before: function(app, server, compiler) {
      //json data for template import export
      app.get('/admin/ajax/*', function(req, res) {
        console.log('http://altrp.nz' + req.url);
        http.get('http://altrp.nz' + req.url, (data) =>{
          let bodyChunks = [];
          data.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
          }).on('end', function() {
            let body = Buffer.concat(bodyChunks);
            res.end(body);
          })
        }).on('error', err=>{
          console.error(err.message);
        });
      });
      app.get('/storage/*', function(req, res) {
        console.log('http://altrp.nz' + req.url);
        http.get('http://altrp.nz' + req.url, (data) =>{
          let bodyChunks = [];
          data.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
          }).on('end', function() {
            let body = Buffer.concat(bodyChunks);
            res.end(body);
          })
        }).on('error', err=>{
          console.error(err.message);
        });
      });
      app.put('/admin/ajax/templates/:id', function(req, res) {
        console.log(req.method);
        console.log('http://altrp.nz' + req.url);
        let body = '';
        req.on('data', chunk=>{
          body += chunk;
        });
        req.on('end', ()=>{
          let options = {
            host:'altrp.nz',
            protocol:'http:',
            path: req.url,
            method: 'PUT',
            body: body,
          };
          res.end(JSON.stringify(options));
          http.request( options, (data) =>{
            let bodyChunks = [];
            console.log(data);
            data.on('data', function(chunk) {
              // You can process streamed parts here...
              bodyChunks.push(chunk);
            }).on('end', function() {
              let body = Buffer.concat(bodyChunks);
              res.end(body);
              console.log(body);
            })
          }).on('error', err=>{
            console.error(err.message);
          });
        });
      });
      app.put('/admin/ajax/templates/:id', function(req, res) {
        let options = {
          hostname: 'altrp.nz',
          path: req.url,
          method: 'PUT',
        };
        console.log(req.url);
        res.send(['ok']);
        // http.request(options, (data ) =>{
        //   let bodyChunks = [];
        //   data.on('data', function(chunk) {
        //     // You can process streamed parts here...
        //     bodyChunks.push(chunk);
        //   }).on('end', function() {
        //     let body = Buffer.concat(bodyChunks);
        //     res.end(body);
        //   })
        // });
      });
      //content for editor window
      app.get('/admin/editor-content', function(req, res) {
        fs.readFile( './resources/views/editor-content.blade.php', (err, data) => {
          if (err) throw err;
          let _data =  data.toString();
          res.end(_data);
        } );
      });
      //and js for editor window
      app.get('/modules/editor/editor.js', function(req, res) {
        http.get({
          hostname: 'localhost',
          port: 3000,
          path: '/editor/bundle.js',
          agent: false  // Create a new agent just for this one request
        }, (_res) => {
          // console.log(res);
          // let _data =  res.();

          _res.setEncoding('utf8');
          let rawData = '';
          _res.on('data', (chunk) => { rawData += chunk; });

          _res.on('end', () => {
            res.end(rawData);
          });
        } );
      });
    }
  },
});
