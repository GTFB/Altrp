import React from "react";
import {ProgressBar} from "@blueprintjs/core";

class ProgressBarWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  /**
   * Получить css классы для progress bar widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    let value = this.props.element.getLockedContent("value") || "100";

    if(!isNaN(value)) {
      value = parseFloat(value) * 0.01;
    }

    const settings = {
      stripes: this.props.element.getResponsiveLockedSetting("stripes", "", true),
      animate: this.props.element.getResponsiveLockedSetting("animate", "", true)
    }
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return (
      <ProgressBar {...settings} className={classes} value={!_.isString(value) ? value : 100}/>
    );
  }
}

export default ProgressBarWidget;
