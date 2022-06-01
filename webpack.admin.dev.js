const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.admin.common.js");
const http = require("http");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, "resources/modules/admin/public/"),
    port: 3002,
    publicPath: "http://localhost:3002/src/",
    hotOnly: true,
    historyApiFallback: true,
  }
});
