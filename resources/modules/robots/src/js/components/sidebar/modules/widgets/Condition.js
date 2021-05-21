import * as React from "react";
import { Handle } from "react-flow-renderer";

export default class Condition extends React.Component {
  constructor(props) {
    super(props);
  }

  getPosition(){
    let position = 'vertical';
    if (this.props?.targetPosition === 'left') position = 'horizontal';
    return position;
  }

  render() {
    let nodeClasses = "flow-node-condition";
    if (this.props.selected) nodeClasses += " selected";
    const handleMap = this.getPosition();
    const topStyle = handleMap === 'vertical' ? '0%' : '100%';
    const bottomStyle = handleMap === 'vertical' ? '100%' : '0%';

    return (
      <div className={nodeClasses}>
        <Handle
          type="target"
          position="left"
          style={{ zIndex: 100, top: topStyle }}
        />
        <div className="wrapper">
          <div></div>
          <div className="condition-text">{this.props?.data?.label}</div>
          <div className="condition-type">{this.props?.type}</div>
        </div>
        <Handle
          type="source"
          position="bottom"
          id="no"
          style={{ left: topStyle, borderRadius: 0 }}
        />
        <Handle
          type="source"
          position="top"
          id="yes"
          style={{ left: bottomStyle, borderRadius: 0 }}
        />
      </div>
    );
  }
}
