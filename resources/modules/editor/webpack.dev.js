const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');
const http = require('http');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/editor/",
    hotOnly: true,
    before: function(app, server, compiler) {
      //json data for template import export
      app.get('/admin/ajax/template/:id', function(req, res) {
        fs.readFile( './data.json', (err, data) => {
          if (err) throw err;
          let _data = JSON.parse( data.toString() );
          res.json({template:_data.template, _:app});
        } );
        // res.json({});
      });
      //content for editor window
      app.get('/admin/editor-content', function(req, res) {
        fs.readFile( '../../views/editor-content.blade.php', (err, data) => {
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