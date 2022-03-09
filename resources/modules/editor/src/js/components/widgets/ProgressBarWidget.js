import React from "react";

const ProgressBarInit = window.altrpLibs.Blueprint.ProgressBar;

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

  render() {
    let value = this.props.element.getLockedContent("value") || "100";

    if(!isNaN(value)) {
      value = parseInt(value) * 0.01;
    }

    const settings = {
      stripes: this.props.element.getResponsiveLockedSetting("stripes", "", true),
      animate: this.props.element.getResponsiveLockedSetting("animate", "", true)
    }

    return (
      <ProgressBarInit {...settings} value={!_.isString(value) ? value : 100}/>
    );
  }
}

export default ProgressBarWidget;
