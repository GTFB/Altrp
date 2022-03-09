import * as React from "react";
import { Handle } from 'react-flow-renderer';
import {connect} from "react-redux";

class Listener extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodeClasses = "flow-node-rect";
    if (this.props.selectedNode === 'start' && this.props.id === this.props.selectedNodeId) nodeClasses += " selected";

    return (
      <div className={nodeClasses}>
        <Handle type="target" position={this.props?.targetPosition ?? 'top'}/>
        <div><h3 className='default-node__label'>{this.props?.data?.label}</h3></div>
        <div className='default-node__type'>{this.props?.type}</div>
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

Listener = connect(mapStateToProps)(Listener)

export default Listener
