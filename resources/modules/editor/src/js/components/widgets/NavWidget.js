import React, { Component } from "react";
import AltrpMenu from "../altrp-menu/AltrpMenu";

class NavWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  render() {
    let content;

    switch (this.state.settings.type_type) {
      case "menu":
        content = <AltrpMenu element={this.props.element}/>;
        break
    }

    return content || '';
  }
}

export default NavWidget;
