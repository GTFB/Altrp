import { ServerStyleSheet } from 'styled-components'
import AltrpModel from "../resources/modules/editor/src/js/classes/AltrpModel";
const sheet = new ServerStyleSheet();

if (typeof performance === "undefined") {
  global.performance = require("perf_hooks").performance;
}
/**
 * Эмулируем окружение клиента
 * @type {{parent: {}}}
 */
global.window = {
  parent: {},
};
global.sSR = true;
// global.document = {
//   addEventListener: () => {
//   },
// };
global.frontElementsManager = require("./classes/modules/FrontElementsManager").default;
global.React = require("react");
global.history = {
  back() {
  }
};
global.iconsManager = new (require("../resources/modules/editor/src/js/classes/modules/IconsManager").default);
global.currentRouterMatch = new AltrpModel({});
global.Component = global.React.Component;
window.frontElementsFabric = require("../resources/modules/front-app/src/js/classes/FrontElementsFabric").default;
const FrontElement = require("../resources/modules/front-app/src/js/classes/FrontElement").default;
require("../resources/modules/editor/src/js/classes/modules/FormsManager.js");
window.elementDecorator = require("../resources/modules/front-app/src/js/decorators/front-element-component").default;
window.ElementWrapper = require("../resources/modules/front-app/src/js/components/ElementWrapper").default;

window.stylesModulePromise = new Promise(function (resolve) {
  window.stylesModuleResolve = resolve;
});

const express = require("express");

const {Provider} = require("react-redux");
require("dotenv").config();
global.appStore = require("../resources/modules/front-app/src/js/store/store").default;
window.parent.appStore = global.appStore;
const ReactDOMServer = require("react-dom/server");
const AreaComponent = require("../resources/modules/front-app/src/js/components/AreaComponent").default;
const Styles = require("../resources/modules/editor/src/js/components/Styles").default;

const {StaticRouter} = require("react-router");
// const { HTML5Backend } = require("react-dnd-html5-backend");
// const { DndProvider } = require("react-dnd");
const {
  default: RouteContentWrapper
} = require("../resources/modules/front-app/src/js/components/styled-components/RouteContentWrapper");

var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({limit: "500mb", extended: true}));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true
  })
);

app.use(express.static("public"));
app.get("/*", (req, res) => {
  return res.json({success: true});
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

  const store = window.appStore;
  const preloadedState = store.getState();
  const body = req.body;
  let json = JSON.parse(req.body.json) || [];
  let page = json.page || [];
  let page_id = json.page_id || '';
  let page_model = json.page_model || {};
  // delete page[3];
  global.altrp = json.altrp || {};
  // global.window.altrpImageLazy = json.altrpImageLazy || 'none';
  // global.window.altrpSkeletonColor = json.altrpSkeletonColor || '#ccc';
  // global.window.altrpSkeletonHighlightColor = json.altrpSkeletonHighlightColor || '#d0d0d0';
  let elements = [];
  global.window.location = {
    href: req.protocol + '://' + req.get('host') + req.originalUrl,
  };
  page.forEach(area=>{
    if(area?.template?.data?.children){
      area.template.data.id && elements.push(area.template.data);
      area.template.data.children.forEach(item=>{
        extractChildren(item, elements)
      })
    }
  });
  elements = elements.map(item => new FrontElement(item));
  const elementStyles = elements.map(element => ({
    styles: element.getStringifyStyles(),
    elementId: element.getId(),
  }));
  const app = ReactDOMServer.renderToString(sheet.collectStyles(
    <Provider store={window.appStore}><div className={`front-app-content `}>
        <StaticRouter>
          <RouteContentWrapper
            className="route-content"
            id="route-content"
          >
            {page.map((area, idx) => {

              return (
                <AreaComponent
                  {...area}
                  area={area}
                  page={page_id}
                  models={[page_model]}
                  key={"appArea_" + area.id}
                />
              );
            })}
          </RouteContentWrapper>
        </StaticRouter>
      </div>
      <Styles elementStyles={elementStyles} />
    </Provider>
    ));

  const styleTags = sheet.getStyleTags()
  // sheet.seal();
  const result = {
    important_styles: unEntity(styleTags),
    content:  unEntity(app),
  };
 return res.json(result);
});

app.use(express.static("../server-build"));

app.listen("9000", () => {
  console.log("Express server started at http://localhost:9000");
});

function extractChildren(item, list){
  list = list || [];
  list.push(item);
  if(item?.children?.length){
    item.children.forEach(item=>{
      extractChildren(item, list);
    })
  }
}
function unEntity(str){
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
