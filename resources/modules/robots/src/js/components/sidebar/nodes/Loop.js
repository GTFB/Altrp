import * as React from "react";
import { Handle } from 'react-flow-renderer';

export default class Loop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "flow-node ";
    if (this.props.selected) nodeClasses += " selected";    
    
    return (
      <div className={nodeClasses}>
        <Handle type="target" position="top" style={{ borderRadius: 0 }} />
        <div>{this.props?.data?.label}</div>
        <Handle
          type="source"
          position="left"
          id="yes"
          style={{ top: '70%', borderRadius: 0 }}
        />
        <Handle
          type="source"
          position="right"
          id="no"
          style={{ top: '70%', borderRadius: 0 }}
        />
      </div>
    );
  }
}
