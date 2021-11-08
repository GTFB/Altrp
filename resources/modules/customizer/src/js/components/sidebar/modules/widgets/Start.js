import * as React from "react";
import { Handle } from 'react-flow-renderer';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "flow-node-begend";
    if (this.props.selected) nodeClasses += " selected";

    return (
      <div className={nodeClasses}>
        <div><h3 className='default-node__label'>{this.props?.data?.label}</h3></div>
        <div className='default-node__type'>{this.props?.type}</div>
        <Handle type="source" position={this.props?.sourcePosition ?? 'bottom'}/>
      </div>
    );
  }
}
