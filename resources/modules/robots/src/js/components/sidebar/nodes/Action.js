import * as React from "react";
import { Handle } from 'react-flow-renderer';

export default class Action extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "react-flow__node-input";
    if (this.props.selected) nodeClasses += " selected";
    
    return (
      <div className={nodeClasses}>
        <Handle type="target" position="top" />
        <div><h3>{this.props?.data?.label}</h3></div>
        <div>{this.props?.type}</div>
        <Handle type="source" position="bottom" style={{ borderRadius: 0 }} />
      </div>
    );
  }
}
