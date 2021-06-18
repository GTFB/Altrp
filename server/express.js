import styled,  { ServerStyleSheet, createGlobalStyle } from "styled-components";
import Area from "../resources/modules/front-app/src/js/classes/Area";
import { parse } from "node-html-parser";
import{Link} from "react-router-dom"
import React from "react";
import {StaticRouter as Router, Route, Switch} from "react-router-dom";
if (typeof performance === "undefined") {
  global.performance = require("perf_hooks").performance;
}
global.styled = styled;
global.createGlobalStyle = createGlobalStyle;
/**
 * Эмулируем окружение клиента
 * @type {{parent: {}}}
 */
global.window = {
  parent: {},
  Link,
};
global.window.altrpMenus = [];
global.SSR = true;
global.window.SSR = true;
// global.document = {
//   addEventListener: () => {
//   },
// };
require( '../resources/modules/front-app/src/js/libs/react-lodash');
require('../resources/modules/front-app/src/js/libs/altrp');
global.frontElementsManager = require("./classes/modules/FrontElementsManager").default;
global.history = {
  back() {}
};
global.iconsManager = new (require("../resources/modules/editor/src/js/classes/modules/IconsManager").default)();
const AltrpModel = require('../resources/modules/editor/src/js/classes/AltrpModel').default
global.currentRouterMatch = new AltrpModel({});
global.Component = global.React.Component;
window.frontElementsFabric = require("../resources/modules/front-app/src/js/classes/FrontElementsFabric").default;
const FrontElement = require("../resources/modules/front-app/src/js/classes/FrontElement")
  .default;
require("../resources/modules/editor/src/js/classes/modules/FormsManager.js");
window.elementDecorator = require("../resources/modules/front-app/src/js/decorators/front-element-component").default;
window.ElementWrapper = require("../resources/modules/front-app/src/js/components/ElementWrapper").default;

window.stylesModulePromise = new Promise(function(resolve) {
  window.stylesModuleResolve = resolve;
});

const express = require("express");
let PORT = process.env.SSR_PORT || 9000;
const { Provider } = require("react-redux");
require("dotenv").config();
global.appStore = require("../resources/modules/front-app/src/js/store/store").default;
window.parent.appStore = global.appStore;
const ReactDOMServer = require("react-dom/server");
const AreaComponent = require("../resources/modules/front-app/src/js/components/AreaComponent")
  .default;
const Styles = require("../resources/modules/editor/src/js/components/Styles")
  .default;

const { StaticRouter } = require("react-router");
// const { HTML5Backend } = require("react-dnd-html5-backend");
// const { DndProvider } = require("react-dnd");
const {
  default: RouteContentWrapper
} = require("../resources/modules/front-app/src/js/components/styled-components/RouteContentWrapper");

var bodyParser = require("body-parser");
const GlobalStyles = require('../resources/modules/front-app/src/js/components/GlobalStyles').default

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
  return res.json({ success: true });

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
  // console.log(data.replace(
  //   '<div id="front-app" class="front-app"></div>',
  //   `<div id="front-app">${component}</div>
  //     `
  // ));

  return res.send(
    data.replace(
      '<div id="front-app" class="front-app"></div>',
      `<div id="front-app">${component}</div>
      `
    )
  );
}

app.post("/", (req, res) => {
  const sheet = new ServerStyleSheet();
  const store = window.appStore;
  let json = JSON.parse(req.body.json) || [];
  let page = json.page || [];
  let page_id = json.page_id || "";
  let page_model = json.page_model || {};
  // delete page[3];
  global.altrp = json.altrp || {};
  /**
   * todo: починить серверную отрисовку для склетона
   * @type {*[]}
   */
  global.window.altrpImageLazy = json.altrpImageLazy || "none";
  global.window.altrpSkeletonColor = json.altrpSkeletonColor || "#ccc";
  global.window.altrpSkeletonHighlightColor =
    json.altrpSkeletonHighlightColor || "#d0d0d0";
  let elements = [];
  global.window.location = {
    href: req.protocol + "://" + req.get("host") + req.originalUrl
  };
  page.forEach(area => {
    if (area?.template?.data?.children) {
      area.template.data.id && elements.push(area.template.data);
      area.template.data.children.forEach(item => {
        extractChildren(item, elements);
      });
    }
  });
  elements = elements.map(item => new FrontElement(item));
  const elementStyles = elements.map(element => ({
    styles: element.getStringifyStyles(),
    elementId: element.getId()
  }));
  window.currentRouterMatch = new AltrpModel({});
  page = page.map(area => (Area.areaFabric(area)))
  let app = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <Router>
        <Switch>
          <Route path='*' exact>
            <Provider store={store}>
              <RouteContentWrapper className="route-content" id="route-content" areas={page}>
                {page.map((area, idx) => {
                  return (
                    <AreaComponent
                      {...area}
                      area={area}
                      areas={page}
                      page={page_id}
                      models={[page_model]}
                      key={"appArea_" + area.id}
                    />
                  );
                })}
                <GlobalStyles/>
              </RouteContentWrapper>
            </Provider>
          </Route>
        </Switch>
      </Router>
    )
  );

  let styleTags = sheet.getStyleTags();
  let _app = parse(app);
  if (_app.querySelector(".styles-container")) {
    styleTags += `<style>${
      _app.querySelector(".styles-container").textContent
    }</style>`;
    _app.removeChild(_app.querySelector(".styles-container"));
    app = _app.toString();
  }
  sheet.seal();
  const result = {
    important_styles: unEntity(styleTags),
    content: unEntity(app)
  };
  return res.json(result);
});

app.use(express.static("../server-build"));

app.listen(PORT, () => {
  console.log(`Express server started at http://localhost:${PORT}`);
});

function extractChildren(item, list) {
  list = list || [];
  list.push(item);
  if (item?.children?.length) {
    item.children.forEach(item => {
      extractChildren(item, list);
    });
  }
}
function unEntity(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
