import * as React from "react";
import { Handle } from "react-flow-renderer";

export default class Robot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // let nodeClasses = "flow-node";
    let nodeClasses = "circle";
    if (this.props.selected) nodeClasses += " selected";

    return (
      <div className={nodeClasses}>
        <Handle type="target" position="top" />
        <div className="wrapper">
          <div></div>
          <div className="robot-text">{this.props?.data?.label}</div>
          <div className="robot-type">{this.props?.type}</div>
        </div>
        <Handle type="source" position="bottom" style={{ borderRadius: 0 }} />
      </div>
    );
  }
}
