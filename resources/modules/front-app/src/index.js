// import React, { Component } from "react";
// import ReactDOM from "react-dom";
import "./sass/front-style.scss";
// import "./js/classes/FrontElementsFabric";
// import "./js/classes/FrontElementsManager";
// (async function(){
//   await import ("./installing");
//   await import ( "react");
//   await import ("react-dom");
//   await import ("./sass/front-style.scss");
//   await import ("./js/classes/FrontElementsFabric");
//   await import ("./js/classes/FrontElementsManager");
// })();
// window.React = React;
// window.ReactDOM = ReactDOM;
// window.Component = Component;

window.stylesModulePromise = new Promise(function(resolve) {
  window.stylesModuleResolve = resolve;
});

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
} else {
  console.log(
    "%cWelcome to Altrp Front App",
    "color: blue; font-size: 24px; font-weight: 900;"
  );
}

(async function(){
  await import('./js/classes/Route');
  console.log(window.Route);
  import ("./installing");
  window.React = (await import ( "react")).default;
  window.Component = window.React.Component;

  window.ReactDOM = (await import ("react-dom")).default;
   await import ("./js/classes/FrontElementsFabric");
   import ("./js/classes/FrontElementsManager");
  // window.iconsManager = new (await import ("../../editor/src/js/classes/modules/IconsManager")).default;
  // const FrontApp = (await import ("./FrontApp")).default;
  // ReactDOM.render(<FrontApp />, document.getElementById("front-app"));

  import("../../editor/src/js/classes/modules/IconsManager").then(
      IconsManager => {
        window.iconsManager = new IconsManager.default();
      }
  );
  import("./FrontApp").then(FrontApp => {
    FrontApp = FrontApp.default;
    ReactDOM.render(<FrontApp />, document.getElementById("front-app"));
  });
})();
