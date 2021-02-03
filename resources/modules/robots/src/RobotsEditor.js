import React, { Component } from "react";
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  Controls,
  removeElements,
  addEdge
} from "react-flow-renderer";

import _ from "lodash";
import "./sass/styles.scss";
import Resource from "../../editor/src/js/classes/Resource";
import { hot } from "react-hot-loader";
import store from "./js/store/store";
import {
  setUpdatedNode,
  setRobotSettingsData
} from "./js/store/robot-settings/actions";

import Sidebar from "./js/components/sidebar/Sidebar";
import Condition from "./js/components/sidebar/nodes/Condition";
import Loop from "./js/components/sidebar/nodes/Loop";
import Begin from "./js/components/sidebar/nodes/Begin";
import Action from "./js/components/sidebar/nodes/Action";
import End from "./js/components/sidebar/nodes/End";
import {
  dataAction,
  dataCondition
} from "./js/components/sidebar/data/data";

class RobotsEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: store.getState().robotSettingsData || [],
      reactFlowInstance: null,
      selected: false
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

  // Удаление ноды
  onElementsRemove = elementsToRemove => {
    const robotStore = store.getState()?.robotSettingsData;
    const newStore = removeElements(elementsToRemove, robotStore);
    store.dispatch(setRobotSettingsData(newStore));
  }

  // Добавление связи между нодами
  onConnect = params => {
    const robotStore = store.getState()?.robotSettingsData;
    const newStore = addEdge(params, robotStore);
    store.dispatch(setRobotSettingsData(newStore));
  }

  // Добавление новой ноды
  onDrop = event => {
    event.preventDefault();
    const reactFlowBounds = this.reactFlowRef.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("reactflow-type");
    const props = this.getNodeData(type);
    const position = this.state.reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const newNode = {
      id: `${this.getId()}`,
      type,
      position,
      data: { type: "node",
              label: `${type}`,
              props
            }
    };

    const robotStore = store.getState()?.robotSettingsData;
    const newStore = robotStore.concat(newNode);
    store.dispatch(setRobotSettingsData(newStore));
  }

  // Получение id нового элемента (ноды)
  getId() {
    const lengthStore = store.getState().robotSettingsData.length;
    return lengthStore + 1;
  }

  // Получение data нового элемента (ноды)
  getNodeData(type) {
    let data = { type };

    switch (type){
      case "action":
        data = dataAction;
        break;
      case "condition":
        data = dataCondition;
        break;
    }
    return data;
  }

  onDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  onLoad = _reactFlowInstance => {
    this.setState(s => ({ ...s, reactFlowInstance: _reactFlowInstance }));
  }

  onNodeDragStop(event, node) {
    store.dispatch(setUpdatedNode(node));
  }

  // Запись активного элемента в state
  onElementClick = (event, element) => {
    this.setState(s => ({ ...s, selected: element }));
  }

  render() {
    let elements = store.getState().robotSettingsData || [];
    return (
      <div className="page__content">
        <ReactFlowProvider>
          <Sidebar elements={ elements } selected={ this.state.selected } onLoad={ this.onLoad }/>
          <div className="content" ref={this.reactFlowRef }>
            <ReactFlow
              elements={ elements }
              onConnect={ this.onConnect }
              onElementsRemove={ this.onElementsRemove }
              onElementClick={ this.onElementClick }
              onLoad={ this.onLoad }
              onDrop={ this.onDrop }
              onNodeDragStart={ this.onNodeDragStart }
              onNodeDragStop={ this.onNodeDragStop }
              onDragOver={ this.onDragOver }
              nodeTypes={{
                begin: Begin,
                condition: Condition,
                action: Action,
                end: End,
                loop: Loop,
              }}
            >
              <Controls />
              <MiniMap
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'begin': return 'green';
                    case 'condition': return 'red';
                    case 'action': return 'blue';
                    default: return '#999';
                  }
                }}
              />
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
