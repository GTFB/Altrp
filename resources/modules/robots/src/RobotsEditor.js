import React, { Component } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  removeElements,
  addEdge
} from "react-flow-renderer";

import _ from "lodash";
import "./sass/styles.scss";
import Resource from "../../editor/src/js/classes/Resource";
import { hot } from "react-hot-loader";
// import CustomNode from "./js/components/sidebar/items/CustomNode";
// import CustomNodeInner from "./js/components/sidebar/items/CustomNodeInner";
import store from "./js/store/store";
import {
  setNodePosition,
  setRobotSettingsData
} from "./js/store/robot-settings/actions";

import Sidebar from "./js/components/sidebar/Sidebar";

class RobotsEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: store.getState().robotSettingsData || [],
      reactFlowInstance: null
    };
    this.resource = new Resource({ route: "/admin/ajax/robots" });

    this.reactFlowRef = React.createRef();
  }

  // Записьв store в state
  updateRobotState() {
    const robotState = store.getState()?.robotSettingsData;
    this.setState(s => ({ ...s, elements: robotState }));
  }

  async componentDidMount() {
    store.subscribe(this.updateRobotState.bind(this));

    const robotId = new URL(window.location).searchParams.get("robot_id");
    const robot = await this.resource.get(robotId);
    const data = JSON.parse(robot.data);
    store.dispatch(setRobotSettingsData(data));
  }

  // onNodeBodyChanged(nodeId, content) {
  //   const state = this.state?.data;
  //   state.nodes[nodeId].properties.body = content;
  //   this.setState(() => ({
  //     ...state
  //   }));
  // }

  // onNodeClick(node) {
  //   if (node.event) {
  //     const selectId = this.state?.selected?.id;
  //     console.log(this.state.nodes[selectId]);
  //     if (!_.isEmpty(selectId)) {
  //       const data = this.state.nodes[selectId]?.properties?.data;
  //       console.log(data);
  //       if (!_.isEmpty(data))  store.dispatch(setRobotSettingsData(data));
  //       console.log(store.getState().robotSettingsData);
  //     }
  //   }
  // }

  // Удаление ноды
  onElementsRemove = elementsToRemove => {
    const robotStore = store.getState()?.robotSettingsData;
    const newStore = removeElements(elementsToRemove, robotStore);
    store.dispatch(setRobotSettingsData(newStore));
  };

  // Добавление связи между нодами
  onConnect = params => {
    const robotStore = store.getState()?.robotSettingsData;
    const newStore = addEdge(params, robotStore);
    store.dispatch(setRobotSettingsData(newStore));
  };

  // Добавление новой ноды
  onDrop = event => {
    event.preventDefault();
    const reactFlowBounds = this.reactFlowRef.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = this.state.reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const newNode = {
      id: `${this.getId()}`,
      type,
      position,
      data: { label: `${type} node` }
    };
    console.log(newNode);

    const robotStore = store.getState()?.robotSettingsData;
    const newStore = robotStore.concat(newNode);
    store.dispatch(setRobotSettingsData(newStore));

    // setElements((es) => es.concat(newNode));
  };

  getId() {
    const lengthStore = store.getState().robotSettingsData.length;
    return lengthStore + 1;
  }

  onDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  onLoad = _reactFlowInstance => {
    this.setState(s => ({ ...s, reactFlowInstance: _reactFlowInstance }));
  };

  onNodeDragStop(event, node) {
    store.dispatch(setNodePosition(node));
  }

  render() {
    return (
      <div className="page__content">
        <ReactFlowProvider>
          <Sidebar chart={store.getState().robotSettingsData || []} />
          <div className="content" ref={this.reactFlowRef}>
            <ReactFlow
              elements={this.state.elements}
              onConnect={this.onConnect}
              onElementsRemove={this.onElementsRemove}
              onLoad={this.onLoad}
              onDrop={this.onDrop}
              onNodeDragStart={this.onNodeDragStart}
              onNodeDragStop={this.onNodeDragStop}
              onDragOver={this.onDragOver}
            >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    );
  }
}

/**
 * Если разработка то включается HMR <br/>
 * По умолчанию просто компонент
 * @member _export
 */
let _export;
process.env.NODE_ENV === "production"
  ? (_export = RobotsEditor)
  : (_export = hot(module)(RobotsEditor));

export default _export;
