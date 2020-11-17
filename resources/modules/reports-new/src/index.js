// Render clear html for reports;
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../front-app/src/sass/front-style.scss";
import "../../front-app/src/js/classes/FrontElementsFabric";
import "../../front-app/src/js/classes/FrontElementsManager";
import "./installing";

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
import("../../editor/src/js/classes/modules/IconsManager").then(
  IconsManager => {
    window.iconsManager = new IconsManager.default();
  }
);

import("./ReportsContent").then(ReportsContent => {
  ReportsContent = ReportsContent.default;
  ReactDOM.render(<ReportsContent />, document.getElementById("reports"));
});
