const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.reports.common.js");
const fs = require("fs");
const http = require("http");

let data;
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, "resources/modules/reports-new/public/"),
    port: 3005,
    publicPath: "http://localhost:3005/src/",
    hotOnly: true,
    before: function(app, server, compiler) {
      app.get("/ajax/routes", function(req, res) {
        console.log("http://altrp.nz" + req.url);
        http
          .get("http://altrp.nz" + req.url, data => {
            let bodyChunks = [];
            data
              .on("data", function(chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
              })
              .on("end", function() {
                let body = Buffer.concat(bodyChunks);
                res.end(body);
              });
          })
          .on("error", err => {
            console.error(err.message);
          });
      });
    }
  }
});
