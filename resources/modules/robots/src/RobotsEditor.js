import React, { Component } from "react";
import { FlowChart } from "@mrblenny/react-flow-chart";
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";

import { mapValues } from "lodash";
import "./sass/styles.scss";
import Resource from "../../editor/src/js/classes/Resource";
import { hot } from "react-hot-loader";
import CustomNode from "./js/components/sidebar/items/CustomNode";
import CustomNodeInner from "./js/components/sidebar/items/CustomNodeInner";

class RobotsEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: {
        x: 0,
        y: 0
      },
      scale: 1,
      nodes: {},
      links: {},
      selected: {},
      hovered: {}
    };
    this.onNodeClick = this.onNodeClick.bind(this);
    this.resource = new Resource({ route: "/admin/ajax/robots" });
    this.stateActions = mapValues(actions, func => (...args) =>
      this.setState({
        ...func(...args),
        onNodeClick: this.onNodeClick(...args)
      })
    );

    this.callbacks = {
      onNodeBodyChanged: this.onNodeBodyChanged.bind(this)
    };
  }

  async componentDidMount() {
    const robotId = new URL(window.location).searchParams.get("robot_id");
    const robot = await this.resource.get(robotId);
    this.setState(() => ({
      ...this.state,
      ...JSON.parse(robot.data)
    }));
  }

  onNodeBodyChanged(nodeId, content) {
    const state = this.state;
    state.nodes[nodeId].properties.body = content;
    this.setState(() => ({
      ...state
    }));
  }

  onNodeClick(node) {
    if (node.event) {
    }
  }

  render() {
    return (
      <div className="page__content">
        {this.props.sidebar(this.state, this.callbacks)}
        <div className="content">
          <FlowChart
            config={{
              smartRouting: true,
              snapToGrid: true
            }}
            chart={this.state}
            Components={{ Node: CustomNode, NodeInner: CustomNodeInner }}
            callbacks={this.stateActions}
          ></FlowChart>
        </div>
      </div>
    );
  }
}

/** @member _export */
let _export;
process.env.NODE_ENV === "production"
  ? (_export = RobotsEditor)
  : (_export = hot(module)(RobotsEditor));

export default _export;
