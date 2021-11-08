const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.customizer.common.js");
const fs = require("fs");
const http = require("http");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, "resources/modules/customizer/public/"),
    port: 3007,
    publicPath: "http://localhost:3007/src/",
    hotOnly: true,
    before: function(app, server, compiler) {
      app.get("/storage/*", function(req, res) {
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
      app.get("/modules/customizer/customizer.js", function(req, res) {
        http.get(
          {
            hostname: "localhost",
            port: 3007,
            path: "/customizer/bundle.js",
            agent: false // Create a new agent just for this one request
          },
          _res => {
            // console.log(res);
            // let _data =  res.();

            _res.setEncoding("utf8");
            let rawData = "";
            _res.on("data", chunk => {
              rawData += chunk;
            });

            _res.on("end", () => {
              res.end(rawData);
            });
          }
        );
      });
    }
  }
});
