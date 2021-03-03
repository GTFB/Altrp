import * as React from "react";
import { Handle } from 'react-flow-renderer';

export default class End extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "flow-node";
    if (this.props.selected) nodeClasses += " selected";
    
    return (
      <div className={nodeClasses}>
        <Handle type="target" position="top" />
        <div><h3 style={{margin: 0, padding: 0}}>{this.props?.data?.label}</h3></div>
        <div>{this.props?.type}</div>
      </div>
    );
  }
}
