import React, { Component } from "react";
import Tooltip from "./Tooltip";
import { set } from "lodash";
import { isEditor } from "../../../../../front-app/src/js/helpers";

class TextWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      tooltipActiveValue: false
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
    this.tooltipActive = this.tooltipActive.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  tooltipActive() {
    if (this.state.tooltipActiveValue) {
      this.setState({
        tooltipActiveValue: !this.state.tooltipActiveValue
      });
    } else {
      setTimeout(() => {
        this.setState({
          tooltipActiveValue: !this.state.tooltipActiveValue
        });
      }, 500);
    }
  }

  changeText(value) {
    let settings = this.props.element.settings;
    settings.text = value;
    this.props.element.setSettings(settings);
    this.props.element.templateNeedUpdate();
  }

  render() {
    let tooltip = (
      <Tooltip
        switch={this.state.settings.text_advanced_tooltip_active || false}
        label={this.state.settings.text_advanced_tooltip_label}
        active={this.state.tooltipActiveValue}
      />
    );
    let tooltipActive = null;
    if (this.state.settings.text_advanced_tooltip_active) {
      tooltipActive = this.tooltipActive;
    }
    let textContent = this.getContent("text");
    let textCap = (
      <>
        <span className="altrp-text-drop-cap">
          {this.state.settings.text?.slice(0, 1)}
        </span>
        <span>{this.state.settings.text?.slice(2)}</span> {tooltip}
      </>
    );
    let text = (
      <>
        {this.state.settings.text} {tooltip}
      </>
    );

    let activeText = "";
    if (this.state.settings.text_drop_cap === true) {
      activeText = textCap;
    } else {
      activeText = text;
    }

    if (this.props.CKEditor) {
      return (
        <this.props.CKEditor
          changeText={this.changeText}
          text={textContent}
          readOnly={isEditor()}
          textWidget={true}
        />
      );
    }

    return React.createElement("div", {
      className: "altrp-text " + this.state.settings.text_position_css_classes,
      id: this.state.settings.text_position_css_id || "",
      onMouseOver: tooltipActive,
      dangerouslySetInnerHTML: {
        __html: textContent || ""
      },
      // dangerouslySetInnerHTML: activeText,

      onMouseLeave: tooltipActive
    });
  }
}

export default TextWidget;
