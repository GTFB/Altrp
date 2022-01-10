import * as React from "react";
import { Handle } from 'react-flow-renderer';
import {connect} from "react-redux";

class Start extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "flow-node-begend";
    if (this.props.selectedNode === 'start' && this.props.id === this.props.selectedNodeId) nodeClasses += " selected";

    return (
      <div className={nodeClasses}>
        <div><h3 className='default-node__label'>{this.props?.data?.label}</h3></div>
        <div className='default-node__type'>{this.props?.type}</div>
        <Handle type="source" position={this.props?.sourcePosition ?? 'bottom'}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedNode: state.copyNodeData.selectedNode,
    selectedNodeId: state.copyNodeData.selectedNodeId
  }
}

Start = connect(mapStateToProps)(Start)

export default Start
