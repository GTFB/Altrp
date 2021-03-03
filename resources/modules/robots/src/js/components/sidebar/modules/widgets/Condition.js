import * as React from "react";
import { Handle } from "react-flow-renderer";

export default class Condition extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // let nodeClasses = "flow-node-condition";
    let nodeClasses = "romb";
    if (this.props.selected) nodeClasses += " selected";

    return (
      <div className={nodeClasses}>
        <Handle
          type="target"
          position="top"
          style={{ zIndex: 100, left: "0%" }}
        />
        <div className="wrapper">
          <div></div>
          <div className="condition-text">{this.props?.data?.label}</div>
          <div className="condition-type">{this.props?.type}</div>
        </div>
        <Handle
          type="source"
          position="left"
          id="no"
          style={{ top: "100%", borderRadius: 0 }}
        />
        <Handle
          type="source"
          position="right"
          id="yes"
          style={{ top: "0%", borderRadius: 0 }}
        />
      </div>
    );
  }
}
