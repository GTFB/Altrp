if (typeof performance === "undefined") {
  global.performance = require("perf_hooks").performance;
}
if (typeof window === "undefined") {
  global.window = {};
  const FrontElementsManager = require("../resources/modules/front-app/src/js/classes/FrontElementsManager")
    .default;
  global.window.frontElementsManager = FrontElementsManager();
  const 
  import(
    /* webpackChunkName: 'FrontElementsManager' */ "./js/classes/FrontElementsManager"
  )
    .then(module => {
      import(
        /* webpackChunkName: 'FrontElementsFabric' */ "./js/classes/FrontElementsFabric"
      ).then(module => {
        console.log("LOAD FrontElementsFabric: ", performance.now());
        loadingCallback();
      });
      return global.window.frontElementsManager.loadComponents();
    })
    .then(components => {
      global.window.frontElementsManager.loadNotUsedComponent();
      console.log("LOAD FrontElementsManager: ", performance.now());
      loadingCallback();
    });
  import(
    /* webpackChunkName: 'elementDecorator' */ "./js/decorators/front-element-component"
  ).then(module => {
    global.window.elementDecorator = module.default;
    console.log("LOAD elementDecorator: ", performance.now());
    loadingCallback();
  });

  import(
    /* webpackChunkName: 'ElementWrapper' */ "./js/components/ElementWrapper"
  ).then(module => {
    global.window.ElementWrapper = module.default;
    console.log("LOAD ElementWrapper: ", performance.now());
    loadingCallback();
  });

  import(
    /* webpackChunkName: 'FormsManager' */ "../../editor/src/js/classes/modules/FormsManager.js"
  ).then(module => {
    console.log("LOAD FormsManager: ", performance.now());
    loadingCallback();
  });
}
const express = require("express");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { Provider } = require("react-redux");
require("dotenv").config();
const appStore = require("../resources/modules/front-app/src/js/store/store");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const AreaComponent = require("../resources/modules/front-app/src/js/components/AreaComponent");
const RouteContent = require("../resources/modules/front-app/src/js/components/RouteContent");
const { StaticRouter } = require("react-router");
const { HTML5Backend } = require("react-dnd-html5-backend");
const { DndProvider } = require("react-dnd");
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
      )?.pages;
      const page = routes.filter(item => item.path === req.originalUrl)[0];
      delete page.areas[3];
      console.log("====================================");
      console.log(page);
      console.log("====================================");
      const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.originalUrl}>
          <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
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
            </DndProvider>
          </Provider>
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

app.post("/", (req, res) => {
  let template = JSON.parse(req.body?.template) || [];
  delete template[3];

  console.log("====================================");
  console.log(template);
  console.log("====================================");
  return res.send(true);
});

app.use(express.static("../server-build"));

app.listen("9000", () => {
  console.log("Express server started at http://localhost:9000");
});
