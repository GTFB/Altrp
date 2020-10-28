import React, { Component } from "react";

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let styles = "altrp-tooltip ";
    if (this.props.active == false) {
      styles += "altrp-tooltip-none"
    }
    let tooltip = null;
    if (this.props.switch) {
      tooltip = <span className={styles}>{this.props.label}</span>;
    }
    return tooltip;
  }
}

export default Tooltip