import React, { Component } from "react";
import { FlowChart } from "@mrblenny/react-flow-chart";
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";

import _ from "lodash";
import "./sass/styles.scss";
import Resource from "../../editor/src/js/classes/Resource";
import { hot } from "react-hot-loader";
import CustomNode from "./js/components/sidebar/items/CustomNode";
import CustomNodeInner from "./js/components/sidebar/items/CustomNodeInner";
import store from "./js/store/store";

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
    this.updateRobotState = this.updateRobotState.bind(this);

    this.resource = new Resource({ route: "/admin/ajax/robots" });

    this.stateActions = _.mapValues(actions, func => (...args) =>
      this.setState(func(...args))

    );
    console.log(actions);

    this.callbacks = {
      // onNodeClick: this.onNodeClick.bind(this),
      onNodeBodyChanged: this.onNodeBodyChanged.bind(this)
    };
  }

  /**
   * Срабатвыает, когда меняется robotState в store
   */
  updateRobotState() {
    const robotState = store.getState()?.robotSettingsData;
    // console.log(robotState);
    const selectId = this.state?.selected?.id;

    if(_.isEmpty(selectId)) return;

    this.setState(state => {
      state = { ...state };
      if(state.nodes[selectId]?.properties?.data instanceof Array)
        state.nodes[selectId].properties.data = robotState;        
        // console.log(state.nodes[selectId]);
      return state
    });           
  }

  async componentDidMount() {
    store.subscribe(this.updateRobotState.bind(this));

    const robotId = new URL(window.location).searchParams.get("robot_id");
    const robot = await this.resource.get(robotId);
    const data = JSON.parse(robot.data);

    this.setState(() => ({
      ...this.state,
      ...data
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
    console.log(node);
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
