import React, { Component } from "react";
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  Controls,
  removeElements,
  addEdge,
  updateEdge,
  isNode,
  isEdge
} from "react-flow-renderer";
import { connect } from "react-redux";
import _ from "lodash";
import "./sass/styles.scss";
import Resource from "../../editor/src/js/classes/Resource";
import { hot } from "react-hot-loader";
import store from "./js/store/store";
import {
  setUpdatedNode,
  setRobotSettingsData
} from "./js/store/robot-settings/actions";
import { setCurrentRobot } from "./js/store/current-robot/actions";
import Sidebar from "./js/components/sidebar/Sidebar";
import Condition from "./js/components/sidebar/modules/widgets/Condition";
import Begin from "./js/components/sidebar/modules/widgets/Begin";
import Action from "./js/components/sidebar/modules/widgets/Action";
import Robot from "./js/components/sidebar/modules/widgets/Robot";
import End from "./js/components/sidebar/modules/widgets/End";
import CustomEdge from "./js/components/sidebar/modules/widgets/CustomEdge";
import ConnectionLine from './js/components/sidebar/modules/widgets/ConnectionLine';

const mapStateToProps = state => {
  return {
    elements: _.cloneDeep(state.robotSettingsData),
    robot: _.cloneDeep(state.currentRobot),
    other: _.cloneDeep(state.otherData),
  };
};

class RobotsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      robot: [],
      reactFlowInstance: null,
      selectNode: false,
      selectEdge: false,
      activePanel: "widgets",
      btnActive: '',
    };
    this.changeTab = this.changeTab.bind(this);
    this.btnChange = this.btnChange.bind(this);
    this.resource = new Resource({ route: "/admin/ajax/robots" });
    this.reactFlowRef = React.createRef();
  }

  // Записьв store в state
  updateRobotState() {
    const elements = store.getState()?.robotSettingsData;
    const robot = store.getState()?.currentRobot;
    this.setState(s => ({ ...s, elements, robot, btnActive: "btn_active" }));
  }

  async componentDidMount() {
    store.subscribe(this.updateRobotState.bind(this));

    const robotId = new URL(window.location).searchParams.get("robot_id");
    const robot = await this.resource.get(robotId);
    store.dispatch(setCurrentRobot(robot));
    if(!robot.chart) return;
    const data = JSON.parse(robot.chart) ?? [];
    store.dispatch(setRobotSettingsData(data));
    this.btnChange('');
  }

  // Удаление ноды или связи
  onElementsRemove = elementsToRemove => {
    const robotStore = store.getState()?.robotSettingsData;
    const selectNode = this.state.selectNode;
    const selectEdge = this.state.selectEdge;
    const newStore = removeElements(elementsToRemove, robotStore);
    if(_.isArray(elementsToRemove)){
      elementsToRemove.map(item =>{
        if(item.id == selectNode?.id) this.setState(s => ({ ...s, selectNode: {} }));
        if(item.id == selectEdge?.id) this.setState(s => ({ ...s, selectEdge: {} }));
      })
    }
    store.dispatch(setRobotSettingsData(newStore));
  }

  // Добавление связи между нодами
  onConnect = params => {
    const robotStore = store.getState()?.robotSettingsData;
    params.label = '';
    params.type = 'default';
    params.animated = true;
    if (params.sourceHandle === 'no') {
      params.label = 'FALSE';
      params.className = 'red';
    }
    if (params.sourceHandle === 'yes') {
      params.label = 'TRUE';
      params.className = 'green';
    }
    const newStore = addEdge(params, robotStore);
    console.log(newStore);
    console.log(params);
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
      data: {
        type: "node",
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
    const time = new Date().getTime();
    return time;
  }

  // Получение data нового элемента (ноды)
  getNodeData(type) {
    let data = { type };

    switch (type){
      case "action":
        data = {
          "type": "action",
          "nodeData": {}
        };
        break;
      case "condition":
        data = {  
          "type": "condition",
          "nodeData": {
              "type": "",
              "operator": "",
              "body": []
          }
        };
        break;
      case "robot":
        data = {  
          "type": "robot",
          "nodeData": {
              "id": "",
          }
        };
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

  onEdgeUpdate = (oldEdge, newConnection) => {
    const robotStore = store.getState()?.robotSettingsData;
    console.log(oldEdge);
    console.log(newConnection);
    const newStore = updateEdge(oldEdge, newConnection, robotStore);
    store.dispatch(setRobotSettingsData(newStore));
  }

  // Запись активного элемента в state
  onElementClick = (event, element) => {
    const elements = store.getState()?.robotSettingsData ?? [];
    let elementStore = {};
    if (_.isArray(elements)){
      elements.map(item =>{
        if(item.id === element.id) elementStore = item;
      });
    }

    if(isNode(elementStore)) this.setState(s => ({ ...s, selectNode: elementStore, selectEdge: false }));
    if(isEdge(elementStore)) this.setState(s => ({ ...s, selectEdge: elementStore, selectNode: false }));
    this.setState(s => ({ ...s, activePanel: "selected" }));
  }

  changeTab(item) {
    this.setState(s => ({ ...s, activePanel: item }));
  }

  btnChange(item) {
    this.setState(s => ({ ...s, btnActive: item }));
  }

  render() {
    console.log(this.state.selectNode);
    console.log(this.state.selectEdge);
    return (
      <div className="page__content">
        <ReactFlowProvider>
          <Sidebar changeTab={this.changeTab}
                  activePanel={ this.state.activePanel }
                  robot={ this.state.robot }
                  elements={ this.state.elements }
                  selectNode={ this.state.selectNode }
                  selectEdge={ this.state.selectEdge }
                  onLoad={ this.onLoad }
                  btnActive={ this.state.btnActive }
                  btnChange={ this.btnChange }
          />
          <div className="content" ref={this.reactFlowRef }>
            <ReactFlow
              elements={ this.props.elements }
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
                robot: Robot,
                end: End,
              }}
              onEdgeUpdate={this.onEdgeUpdate}
              edgeTypes={{
                custom: CustomEdge,
              }}
              connectionLineComponent={ConnectionLine}
            >
              <Controls />
              <MiniMap
                nodeColor={node => {
                  switch (node.type) {
                    case 'condition': return '#FF4E6E';
                    case 'action': return '#315EFB';
                    case 'robot': return '#87CA00';
                    default: return '#8E94AA';
                  }
                }}
                nodeClassName={node => {
                  switch (node.type) {
                    case 'robot': return 'robot-node-map';
                    case 'condition': return 'condition-node-map';
                    default: return 'flow-node';
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

export default connect(mapStateToProps)(_export);