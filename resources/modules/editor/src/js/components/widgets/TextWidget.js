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

    let textCap = <><span className="altrp-text-drop-cap">{this.state.settings.text.slice(0,1)}</span><span>{this.state.settings.text.slice(2)}</span> {tooltip}</>;
    let text = <>{this.state.settings.text} {tooltip}</>;

    let activeText = "";
    if(this.state.settings.text_drop_cap === true) {
      activeText = textCap;
    } else {
      activeText = text;
    }
    return React.createElement('div',
        {
          className: "altrp-text",
          onMouseOver: tooltipActive,
          dangerouslySetInnerHTML: {
            __html: this.state.settings.text
          },
          // dangerouslySetInnerHTML: activeText,

          onMouseLeave:tooltipActive
        });

  }
}

export default TextWidget