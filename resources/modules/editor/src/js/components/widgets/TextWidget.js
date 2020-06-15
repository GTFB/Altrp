import React, {Component} from "react";
import Tooltip from "./Tooltip";
import { set } from "lodash";

class TextWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      tooltipActiveValue: false
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
    this.tooltipActive = this.tooltipActive.bind(this);
  }

  tooltipActive() {
    if(this.state.tooltipActiveValue) {
      this.setState({
        tooltipActiveValue: !this.state.tooltipActiveValue
      })
    } else {
      setTimeout(() => {
        this.setState({
          tooltipActiveValue: !this.state.tooltipActiveValue
        })
      }, 500);
    }
  }

  render(){

    let tooltip = <Tooltip
    switch={this.state.settings.text_advanced_tooltip_active || false}
    label={this.state.settings.text_advanced_tooltip_label}
    active={this.state.tooltipActiveValue}
    />;
    let tooltipActive = null;
    if(this.state.settings.text_advanced_tooltip_active) {
      tooltipActive = this.tooltipActive
    }

    let textCap = <span className="altrp-text"><span className="altrp-text-drop-cap">{this.state.settings.text.slice(0,1)}</span><span>{this.state.settings.text.slice(2)}</span> {tooltip}</span>
    let text = <span className="altrp-text">{this.state.settings.text} {tooltip}</span>;

    let activeText = "";
    if(this.state.settings.text_drop_cap == true) {
      activeText = textCap;
    } else {
      activeText = text;
    };

    return <div>
      {React.createElement(this.state.settings.text_settings_html_tag, {className: "altrp-text",  onMouseOver: tooltipActive, onMouseLeave:tooltipActive}, activeText)}
    </div>
  }
}

export default TextWidget