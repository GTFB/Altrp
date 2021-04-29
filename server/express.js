if (typeof performance === "undefined") {
  global.performance = require("perf_hooks").performance;
}
global.window = {};
require("../resources/modules/front-app/src/js/classes/FrontElementsManager");
window.React = require("react");
window.Component = window.React.Component;
window.frontElementsFabric = require("../resources/modules/front-app/src/js/classes/FrontElementsFabric").default;
require("../resources/modules/editor/src/js/classes/modules/FormsManager.js");
window.elementDecorator = require("../resources/modules/front-app/src/js/decorators/front-element-component").default;
window.ElementWrapper = require("../resources/modules/front-app/src/js/components/ElementWrapper").default;

window.stylesModulePromise = new Promise(function(resolve) {
  window.stylesModuleResolve = resolve;
});

const express = require("express");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { Provider } = require("react-redux");
require("dotenv").config();
const appStore = require("../resources/modules/front-app/src/js/store/store");
// import appStore from "../resources/modules/front-app/src/js/store/store";
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const AreaComponent = require("../resources/modules/front-app/src/js/components/AreaComponent");
// const { StaticRouter } = require("react-router");
// const { HTML5Backend } = require("react-dnd-html5-backend");
// const { DndProvider } = require("react-dnd");
const {
  default: RouteContentWrapper
} = require("../resources/modules/front-app/src/js/components/styled-components/RouteContentWrapper");

var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "500mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true
  })
);

app.use(express.static("public"));
app.get("/*", (req, res) => {
  const store = appStore.default;
  const preloadedState = store.getState();

  const indexFile = path.resolve("./server-build/index.html");
  fs.readFile(indexFile, "utf8", async (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    try {
      const routes = (
        await (await fetch(`${process.env.APP_URL}/ajax/routes?lazy=0`)).json()
      ).pages;
      const page = routes.filter(item => item.path === req.originalUrl)[0];
      delete page.areas[3];
      console.log("====================================");
      console.log(page);
      console.log("====================================");
      const app = ReactDOMServer.renderToString(
        <Provider store={store}>
          <div className={`front-app-content`}>
            <RouteContentWrapper
              className="route-content"
              id="route-content"
            >
              {page.areas.map(area => {
                return (
                  <AreaComponent.default
                    {...area}
                    area={area}
                    page={page.id}
                    models={[page.model]}
                    key={"appArea_" + area.id}
                  />
                );
              })}
            </RouteContentWrapper>
          </div>
        </Provider>
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
 * @param {Request} req
 * @param {Response} res
 * @param {string}data
 * @param {any} component
 * @param page
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
      var page_id = ${page.id};
      var page_areas = ${JSON.stringify(page).replace(/</g, "\\u003c")}

      if (typeof page_id !== 'undefined' && typeof page_areas !== 'undefined') {
        window.pageStorage[page_id] = {areas:page_areas};
      }
    </script>`
    )
  );
}

app.post("/", (req, res) => {

  const store = window.appStore;
  const preloadedState = store.getState();
  const body = req.body;
  let json = JSON.parse(req.body.json) || [];
  let page = json.page || [];
  let page_id = json.page_id || '';
  let page_model = json.page_model || {};
  delete page[3];

  const app = ReactDOMServer.renderToString(
    <Provider store={window.appStore}>
      <div className={`front-app-content`}>
        <RouteContentWrapper
          className="route-content"
          id="route-content"
        >
          {page.map(area => {
            return (
              <AreaComponent.default
                {...area}
                area={area}
                page={page_id}
                models={[page_model]}
                key={"appArea_" + area.id}
              />
            );
          })}
        </RouteContentWrapper>
      </div>
    </Provider>
  );
  const indexFile = path.resolve("./server-build/index.html");
  fs.readFile(indexFile, "utf8", async (err, data) => {
    return renderHTML(req, res, data, app, page, preloadedState);
  })
  return res.send(true);
});

app.use(express.static("../server-build"));

app.listen("9000", () => {
  console.log("Express server started at http://localhost:9000");
});
