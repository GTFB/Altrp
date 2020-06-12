import React, { Component } from "react";

class ButtonWidget extends Component {
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
    return (
      <button
        className={"altrp-btn " + this.state.settings.position_css_classes}
        id={this.state.settings.position_css_id}
      >
        {this.state.settings.button_text || ""}
      </button>
    );
  }
}

export default ButtonWidget;
