import React, { Component } from "react";
import {isEditor} from "../../helpers";
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
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    e.preventDefault();
    if(isEditor()){
      console.log(this.state.settings);
    } else {

    }
  }

  render() {
    let button = <button onClick={this.onClick}
        className={"altrp-btn " + (this.state.settings.position_css_classes || '')}
        id={this.state.settings.position_css_id}
      >
        {this.state.settings.button_text || ""}
      </button>;
    let link = null;
    if(this.state.settings.link_link.url != null && this.state.settings.link_link.url != "") {
      link = <a onClick={this.onClick} href={this.state.settings.link_link.url} className="altrp-btn">link (перекидывает){button}</a>
    }

    return link || button
  }
}

export default ButtonWidget;
