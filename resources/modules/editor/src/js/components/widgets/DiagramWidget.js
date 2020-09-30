import React, { Component, Suspense } from "react";
import {getDataByPath} from "../../../../../front-app/src/js/helpers";

const AltrpDiagram = React.lazy(() => import("../altrp-diagram/AltrpDiagram"));
class DiagramWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  render() {
    let pathToData = this.props.element.getSettings('datasource_path');
    if(pathToData){
      let data = getDataByPath(pathToData, []);
    }
    return (
      <Suspense fallback={"Loading"}>
        <AltrpDiagram settings={this.state.settings} />
      </Suspense>
    );
  }
}

export default DiagramWidget;
