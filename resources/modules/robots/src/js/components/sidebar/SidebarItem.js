import * as React from "react";

import { REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";

export default class SidebarItem extends React.Component {
  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
  }

  onDragStart(event) {
    event.dataTransfer.setData(
      REACT_FLOW_CHART,
      JSON.stringify({
        type: this.props.type,
        ports: this.props.ports,
        properties: this.props.properties
      })
    );
  }

  render() {
    return (
      <div
        className="widget-icon"
        draggable={true}
        onDragStart={this.onDragStart}
      >
        <div className="widget-icon__title">{this.props.type}</div>
      </div>
    );
  }
}
