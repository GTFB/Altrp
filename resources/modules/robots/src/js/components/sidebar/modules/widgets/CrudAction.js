import * as React from "react";
import { Handle } from 'react-flow-renderer';

export default class CrudAction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "flow-node-crud";
    if (this.props.selected) nodeClasses += " selected";

    return (
      <div className={nodeClasses}>
        <Handle type="target" position="top" />
        <div><h3 className='default-node__label'>{this.props?.data?.label}</h3></div>
        <div className='default-node__type'>{this.props?.type}</div>
        <Handle type="source" position="bottom" style={{ borderRadius: 0 }} />
      </div>
    );
  }
}
