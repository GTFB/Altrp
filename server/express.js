const express = require("express");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();
const appStore = require("../resources/modules/front-app/src/js/store/store");
const _ = require("lodash");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const FrontAppServer = require("../resources/modules/front-app/src/FrontAppServer");
const { StaticRouter } = require("react-router");

const app = express();
app.use(express.static("public"));
app.get("/*", (req, res) => {
  const store = appStore.default;
  const preloadedState = store.getState();

  const indexFile = path.resolve("./server-dist/index.html");
  fs.readFile(indexFile, "utf8", async (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    try {
      const routes = (
        await (
          await fetch(`${process.env.APP_URL}/ajax/routes?ssr=true`)
        ).json()
      )?.pages;
      console.log("====================================");
      console.log(routes);
      console.log("====================================");
      const page = routes.filter(item => item.path === req.originalUrl)[0];
      const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.originalUrl}>
          <FrontAppServer.default routes={routes} />
        </StaticRouter>
      );
      return renderHTML(req, res, data, app, page, preloadedState);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
    // const page = routes.filter(item => item.path === req.originalUrl)[0];
    // return renderHTML(req, res, data, app, page, preloadedState);
  });
});
/**
 *
 * @param {Response} res
 * @param {any} component
 * @param {any} store
 */
function renderHTML(req, res, data, component, page, store) {
  return res.send(
    data.replace(
      '<div id="front-app" class="front-app"></div>',
      `<div id="front-app">${component}</div>
      <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(store).replace(
        /</g,
        "\\u003c"
      )}
      window.pageStorage = {};
      window.ALTRP_DEBUG = false;
      var page_id = ${page?.id};
      var page_areas = ${JSON.stringify(page?.areas)?.replace(/</g, "\\u003c")}
  
      if (typeof page_id !== 'undefined' && typeof page_areas !== 'undefined') {
        window.pageStorage[page_id] = {areas:page_areas};
      }
    </script>`
    )
  );
}

app.use(express.static("../server-dist"));

app.listen("9000", () => {
  console.log("Express server started at http://localhost:9000");
});
