const express = require("express");
const fs = require("fs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const app = express();
app.get("/", (req, res) => {
  let FrontApp = require("../resources/modules/front-app/src/FrontApp");
  FrontApp = FrontApp.default;
  const app = ReactDOMServer.renderToString(<FrontApp></FrontApp>);

  const indexFile = path.resolve("../server-dist/index.html");
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
