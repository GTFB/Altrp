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
  },
});
