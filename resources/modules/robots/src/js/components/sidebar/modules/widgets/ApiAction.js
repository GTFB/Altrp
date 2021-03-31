import * as React from "react";
import { Handle } from 'react-flow-renderer';

export default class ApiAction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "flow-node-api";
    if (this.props.selected) nodeClasses += " selected";

    return (
      <div className={nodeClasses}>
        <Handle type="target" position="top" />
        <div className="wrapper">
          <div></div>
          <div className="api-text">{this.props?.data?.label}</div>
          <div className="api-type">{this.props?.type}</div>
        </div>

        {/*<div><h3 className='default-node__label'>{this.props?.data?.label}</h3></div>*/}
        {/*<div className='default-node__type'>{this.props?.type}</div>*/}
        <Handle type="source" position="bottom" style={{ borderRadius: 0 }} />
      </div>
    );
  }
}
