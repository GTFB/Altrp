import React from "react";
import ReactDOM from "react-dom";
import RobotsEditor from "./RobotsEditor";

import Sidebar from "./js/components/sidebar/Sidebar";

ReactDOM.render(
  <RobotsEditor
    sidebar={(chart, callbacks) => (
      <Sidebar callbacks={callbacks} chart={chart} />
    )}
  />,
  document.querySelector("#robots-editor")
);
