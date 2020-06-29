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
    let button = <button
        className={"altrp-btn " + (this.state.settings.position_css_classes || '')}
        id={this.state.settings.position_css_id}
      >
        {this.state.settings.button_text || ""}
      </button>;
    let link = null;
    if(this.state.settings.link_link.url != null && this.state.settings.link_link.url != "") {
      link = <a href={this.state.settings.link_link.url} className="altrp-btn">link (перекидывает){button}</a>
    }

    return link || button
  }
}

export default ButtonWidget;
