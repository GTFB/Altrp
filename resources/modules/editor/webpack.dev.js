const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/editor/",
    hotOnly: true,
    before: function(app, server, compiler) {
      app.get('/admin/ajax/template/:id', function(req, res) {
        fs.readFile( './data.json', (err, data) => {
          if (err) throw err;
          let _data = JSON.parse( data.toString() );
          res.json({template:_data.template, _:app});
        } )
        // res.json({});
      });
    }
  },
});