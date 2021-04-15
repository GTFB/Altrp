const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const _ = require("lodash");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const FrontApp = require("../resources/modules/front-app/src/FrontApp");
const { StaticRouter } = require("react-redux");

const app = express();
console.log("====================================");
console.log(__dirname);
console.log("====================================");
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("====================================");
  const App = FrontApp.default;
  console.log("App");
  console.log(typeof App === "undefined");
  console.log("====================================");
  const app = ReactDOMServer.renderToString(
    <StaticRouter locality={req.originalUrl}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve("./server-dist/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace(
        '<div id="front-app"></div>',
        `<div id="front-app">${app}</div>`
      )
    );
  });
});

app.use(express.static("../server-dist"));

app.listen("9000", () => {
  console.log("Express server started at http://localhost:9000");
});
