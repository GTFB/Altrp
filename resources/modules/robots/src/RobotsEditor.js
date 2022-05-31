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
import dagre from 'dagre';
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
import Start from "./js/components/sidebar/modules/widgets/Start";
import BotWidget from "./js/components/sidebar/modules/widgets/BotWidget";
import DocumentAction from "./js/components/sidebar/modules/widgets/DocumentAction";
import CrudAction from "./js/components/sidebar/modules/widgets/CrudAction";
import ApiAction from "./js/components/sidebar/modules/widgets/ApiAction";
import MessageAction from "./js/components/sidebar/modules/widgets/MessageAction";
import Robot from "./js/components/sidebar/modules/widgets/Robot";
import Finish from "./js/components/sidebar/modules/widgets/Finish";
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
      robot: null,
      sources: [],
      reactFlowInstance: null,
      selectNode: false,
      selectEdge: false,
      activePanel: "widgets",
      btnActive: '',
    };
    this.changeTab = this.changeTab.bind(this);
    this.btnChange = this.btnChange.bind(this);
    this.setSources = this.setSources.bind(this);
    this.getLayoutedElements = this.getLayoutedElements.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.resource = new Resource({ route: "/admin/ajax/robots" });
    this.reactFlowRef = React.createRef();
    this.dagreGraph = new dagre.graphlib.Graph();

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
    let robot = await this.resource.get(robotId)
    robot = {
      ...robot,
      _categories: robot.categories,
    }
    if (_.isString(robot.start_config)) robot.start_config = JSON.parse(robot.start_config);
    store.dispatch(setCurrentRobot(robot));
    if (robot.sources) {
      let sources = this.changeSources(robot.sources);
      this.setState(s => ({ ...s, sources}));
    }
    if(!robot.chart) return;
    const data = _.isString(robot.chart) ? JSON.parse(robot.chart) : robot.chart;
    store.dispatch(setRobotSettingsData(data));
    this.btnChange('');

    this.dagreGraph.setDefaultEdgeLabel(() => ({}));
  }

  setSources(sources){
    this.setState(s => ({...s, sources}));
  }

  changeSources(sources){
    if(_.isArray(sources)) {
      sources.map(item =>{
        item.parameters = item?.pivot?.parameters ?? '';
        return item;
      });
    }
    return sources;
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
    const handleMap = this.getPosition();
    const newNode = {
      id: `${this.getId()}`,
      type,
      position,
      targetPosition: handleMap === 'vertical' ? 'top' : 'left',
      sourcePosition: handleMap === 'vertical' ? 'bottom' : 'right',
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
    return new Date().getTime();
  }

  // Получение настроек отображения нод (горизонтально или вертикально)
  getPosition() {
    const elements = store.getState()?.robotSettingsData;
    let position = 'vertical';
    if (_.isArray(elements)){
      elements.map(item => {
        if (item?.targetPosition === 'left') position = 'horizontal';
        else if (item?.sourcePosition === 'right') position = 'horizontal';
      });
    }
    return position;
  }

  // Получение data нового элемента (ноды)
  getNodeData(type) {
    let data = { type };

    switch (type){
      case "documentAction":
        data = {
          "type": "documentAction",
          "nodeData": {
            "type": "document",
            "data": {
            }
          },
        };
        break;
      case "crudAction":
        data = {
          "type": "crudAction",
          "nodeData": {
            "type": "crud",
            "data": {
              "method": "",
              "body": {},
              "record": "",
              "model_id": "",
            }
          }
        };
        break;
      case "apiAction":
        data = {
          "type": "apiAction",
          "nodeData": {
            "type": "api",
            "data": {
                "source": "",
                "method": "",
                "headers": "",
                "name": "",
                "url": "",
                "data": ""
            }
          },
        };
        break;
      case "messageAction":
        data = {
          "type": "messageAction",
          "nodeData": {
            "type": "send_notification",
            "data": {
              "entities": "",
              "entitiesData": {
                "users": [],
                "roles": [],
                "dynamicValue": "",
              },
              "channel": "",
              "content": {},
            }
          }
        };
        break;
      case "condition":
        data = {
          "type": "condition",
          "nodeData": {
              "operator": "",
              "body": []
          }
        };
        break;
      case "start":
        data = {
          "type": "start",
          "nodeData": {
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
      case "bot":
        data = {
          "type": "bot",
          "nodeData": {
            "type": "bot",
            "data": {
              "shortcode": "",
              "content": [],
            }
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

  onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView({ includeHiddenNodes: true });
    this.setState(s => ({ ...s, reactFlowInstance }));
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

  onLayout(item) {
    const elements = store.getState()?.robotSettingsData;
    // const newElements = _.cloneDeep(elements);

    const layoutedElements = this.getLayoutedElements(elements, item);
    console.log(layoutedElements);
    store.dispatch(setRobotSettingsData(layoutedElements));
  }

  getLayoutedElements(elements, direction = 'TB') {
    const isHorizontal = direction === 'LR';
    this.dagreGraph.setGraph({ rankdir: direction });

    const nodeWidth = 172;
    const nodeHeight = 36;

    elements.forEach((el) => {
      if (isNode(el)) {
        this.dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        this.dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(this.dagreGraph);

    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = this.dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? 'left' : 'top';
        el.sourcePosition = isHorizontal ? 'right' : 'bottom';
        console.log(el);

        // unfortunately we need this little hack to pass a slighltiy different position
        // to notify react flow about the change. More over we are shifting the dagre node position
        // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }

      return el;
    });
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
                  sources={ this.state.sources }
                  elements={ this.state.elements }
                  selectNode={ this.state.selectNode }
                  selectEdge={ this.state.selectEdge }
                  onLoad={ this.onLoad }
                  btnActive={ this.state.btnActive }
                  btnChange={ this.btnChange }
                  setSources={ this.setSources }
                   onLayout={ this.onLayout }
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
                start: Start,
                condition: Condition,
                documentAction: DocumentAction,
                crudAction: CrudAction,
                apiAction: ApiAction,
                messageAction: MessageAction,
                robot: Robot,
                bot: BotWidget,
                finish: Finish,
              }}
              onEdgeUpdate={this.onEdgeUpdate}
              edgeTypes={{
                custom: CustomEdge,
              }}
              connectionLineComponent={ConnectionLine}
              selectNodesOnDrag={false}
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
