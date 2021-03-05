import * as React from "react";
import { Handle } from 'react-flow-renderer';

export default class Condition extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "flow-node-condition";
    if (this.props.selected) nodeClasses += " selected";    
   
    return (
      <div className={nodeClasses}>
        <Handle type="target" position="top" style={{ zIndex: 100}}/>
        <div className="condition-romb"><h3>{this.props?.data?.label}</h3></div>
        <div className="condition-type">{this.props?.type}</div>
        <Handle
          type="source"
          position="left"
          id="no"
          style={{ top: '65%', borderRadius: 0 }}
        />
        <Handle
          type="source"
          position="right"
          id="yes"
          style={{ top: '65%', borderRadius: 0 }}
        />
      </div>
    );
  }
}
