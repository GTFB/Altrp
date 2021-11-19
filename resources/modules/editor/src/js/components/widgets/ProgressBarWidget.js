import React from "react";

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
    return (
      <div>
        bar
      </div>
    );
  }
}

export default ProgressBarWidget;
