import React, { Component } from "react";
import AltrpDiagram from "../altrp-diagram/AltrpDiagram";

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
    return <AltrpDiagram settings={this.state.settings} />;
  }
}

export default DiagramWidget;
