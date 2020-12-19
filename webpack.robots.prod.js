const merge = require("webpack-merge");
const common = require("./webpack.robots.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./public/modules/robots/"),
    publicPath: "/modules/robots/",
    filename: "robots.js"
  }
});
