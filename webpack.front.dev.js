const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.front.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: false,
    disableHostCheck: true,
    contentBase: path.join(__dirname, "resources/modules/front-app/public/"),
    port: 3001,
    publicPath: "http://localhost:3001/src/",
  },
});
