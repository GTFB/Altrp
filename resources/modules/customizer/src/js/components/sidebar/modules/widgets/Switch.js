import * as React from "react";
import {Handle} from "react-flow-renderer";
import {connect} from "react-redux";

class Switch extends React.Component {
  constructor(props) {
    super(props);
  }

  getPosition() {
    let position = 'vertical';
    if (this.props?.targetPosition === 'left') position = 'horizontal';
    return position;
  }

  render() {
    let nodeClasses = "flow-node-condition";
    if (this.props.selectedNode === 'switch' && this.props.id === this.props.selectedNodeId) nodeClasses += " selected";
    const handleMap = this.getPosition();
    const topStyle = handleMap === 'vertical' ? '0%' : '100%';
    const left = handleMap === 'vertical' ? '100%' : '0%';
    const items = this.props?.data?.props?.items || []
    const handle = React.createElement(Handle, {
      type: "source",
      position: "top",
      id: `yes-${0}`,
      key: `yes-${0}`,
      style: {
        left,
        zIndex: -10000,
        visibility: 'hidden',
        top: 20 * 0 + 'px',
        borderRadius: 0
      }
    });
    return (
      <div className={nodeClasses}>
        <Handle
          type="target"
          position="left"
          style={{zIndex: 100, top: topStyle}}
        />
        <div className="wrapper">
          <div></div>
          <div className="condition-text">{this.props?.data?.label}</div>
          <div className="condition-type">{this.props?.type}</div>
        </div>
        {
          items.map((item, idx) => {

            return <Handle
              type="source"
              position="top"
              id={`yes-${idx}`}
              key={`yes-${idx}`}
              style={{
                left,
                top: 20 * idx + 'px',
                borderRadius: 0
              }}
            />
          })
        }
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

Switch = connect(mapStateToProps)(Switch)

export default Switch
