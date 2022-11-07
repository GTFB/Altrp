import React, {Component} from "react";
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
import {connect} from "react-redux";
import _ from "lodash";
import "./sass/styles.scss";
import "../../editor/src/sass/controller-media.scss";
import Resource from "../../editor/src/js/classes/Resource";
import {hot} from "react-hot-loader";
import store from "./js/store/store";
import {
  setUpdatedNode,
  setCustomizerSettingsData
} from "./js/store/customizer-settings/actions";
import {setCurrentCustomizer} from "./js/store/current-customizer/actions";
import Sidebar from "./js/components/sidebar/Sidebar";
import CustomEdge from "./js/components/sidebar/modules/widgets/CustomEdge";
import ConnectionLine from './js/components/sidebar/modules/widgets/ConnectionLine';
import ContextMenuCustomizer from "./js/components/sidebar/modules/data/ContextMenuCustomizer";
import {contextMenu} from "react-contexify";
import {setCopyNode, setSelectNode} from "./js/store/copy-node/action";
import {isJSON} from "../../front-app/src/js/helpers";
import {io} from "socket.io-client";

const mapStateToProps = state => {
  return {
    elements: _.cloneDeep(state.customizerSettingsData),
    customizer: _.cloneDeep(state.currentCustomizer),
    other: _.cloneDeep(state.otherData),
    nodeState: state.nodeStoreData.nodes,
    lineState: state.connectionLineTypeData
  };
};

class CustomizerEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      customizer: [],
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
    this.resource = new Resource({route: "/admin/ajax/customizers"});
    this.reactFlowRef = React.createRef();
    this.dagreGraph = new dagre.graphlib.Graph();

    this.getConnect()
  }

  // Записьв store в state
  updateCustomizerState() {
    const elements = store.getState()?.customizerSettingsData;
    const customizer = store.getState()?.currentCustomizer;
    this.setState(s => ({...s, elements, customizer, btnActive: "btn_active"}));
  }

  updateCustomizer = async () => {
    const customizerId = new URL(window.location).searchParams.get("customizer_id");
    const customizer = (await this.resource.get(customizerId)).data
    store.dispatch(setCurrentCustomizer(customizer));
  }

  checkingLocalStorageRelevance = async () => {
    let localObj = await navigator.clipboard?.readText()
    if (localObj && isJSON(localObj)) {
      store.dispatch(setCopyNode(true))
    } else {
      store.dispatch(setCopyNode(false))
    }
  }

  // Подключение вебсокетов
  async getConnect() {
    let currentUser = await new Resource({
      route: "/ajax/current-user"
    }).getAll();
    currentUser = currentUser.data;

    if(currentUser.guid && !this.altrpIo) {
      this.altrpIo = io( {
        path: '/wsaltrp',
        auth: {
          key: currentUser.guid,
        },
      })
      this.altrpIo.on("message", (data) => {
        console.log(data)
      })
    }
  }


  async componentDidMount() {
    try{
      await this.checkingLocalStorageRelevance()
    }catch (e) {
      console.error(e);
    }
    store.subscribe(this.updateCustomizerState.bind(this));

    const customizerId = new URL(window.location).searchParams.get("customizer_id");
    const customizer = (await this.resource.get(customizerId)).data
    if (_.isString(customizer.start_config)) customizer.start_config = JSON.parse(customizer.start_config);
    store.dispatch(setCurrentCustomizer(customizer));
    if (customizer.sources) {
      let sources = this.changeSources(customizer.sources);
      this.setState(s => ({...s, sources}));
    }
    if (!customizer.data) return;
    let data = _.isString(customizer.data) ? JSON.parse(customizer.data) : customizer.data;
    if (!_.isArray(data)) {
      data = [];
    }
    store.dispatch(setCustomizerSettingsData(data));
    this.btnChange('');

    this.dagreGraph.setDefaultEdgeLabel(() => ({}));
  }

  setSources(sources) {
    this.setState(s => ({...s, sources}));
  }

  changeSources(sources) {
    if (_.isArray(sources)) {
      sources.map(item => {
        item.parameters = item?.pivot?.parameters ?? '';
        return item;
      });
    }
    return sources;
  }

  // Удаление ноды или связи
  onElementsRemove = elementsToRemove => {
    const customizerStore = store.getState()?.customizerSettingsData;
    const selectNode = this.state.selectNode;
    const selectEdge = this.state.selectEdge;
    const newStore = removeElements(elementsToRemove, customizerStore);
    if (_.isArray(elementsToRemove)) {
      elementsToRemove.map(item => {
        if (item.id == selectNode?.id) this.setState(s => ({...s, selectNode: {}}));
        if (item.id == selectEdge?.id) this.setState(s => ({...s, selectEdge: {}}));
      })
    }
    this.PaneClick();
    store.dispatch(setCustomizerSettingsData(newStore));
  }

  // Добавление связи между нодами
  onConnect = params => {
    const customizerStore = store.getState()?.customizerSettingsData;
    params.label = '';
    params.type = this.props.lineState.typeLine;
    params.animated = this.props.lineState.animateLine;
    params.style = {stroke: this.props.lineState.colorLine};
    if (params.sourceHandle === 'no') {
      params.label = 'FALSE';
      params.className = 'red';
    }
    if (params.sourceHandle === 'yes') {
      params.label = 'TRUE';
      params.className = 'green';
    }
    const newStore = addEdge(params, customizerStore);
    store.dispatch(setCustomizerSettingsData(newStore));
  }

  // Добавление новой ноды
  onDrop = event => {
    event.preventDefault();
    const reactFlowBounds = this.reactFlowRef.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("reactflow-type");
    let props;

    props = this.getNodeData(type);

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

    const customizerStore = store.getState()?.customizerSettingsData;
    const newStore = customizerStore.concat(newNode);
    store.dispatch(setCustomizerSettingsData(newStore));
  }

  // Получение id нового элемента (ноды)
  getId() {
    return new Date().getTime();
  }

  // Получение настроек отображения нод (горизонтально или вертикально)
  getPosition() {
    const elements = store.getState()?.customizerSettingsData;
    let position = 'vertical';
    if (_.isArray(elements)) {
      elements.map(item => {
        if (item?.targetPosition === 'left') position = 'horizontal';
        else if (item?.sourcePosition === 'right') position = 'horizontal';
      });
    }
    return position;
  }

  // Получение data нового элемента (ноды)
  getNodeData(type) {
    let data = {type};

    switch (type) {
      case "switch":
        data = {
          "type": "switch",
          "items": []
        };
        break;
      case "change":
        data = {
          "type": "change",
          "items": []
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
      case "customizer":
        data = {
          "type": "customizer",
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

  onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView({includeHiddenNodes: true});
    this.setState(s => ({...s, reactFlowInstance}));
  }

  onNodeDragStop = (event, node) => {
    if (node.id !== this.state.selectNode?.id) {
      this.PaneClick();
    }
    store.dispatch(setUpdatedNode(node));
  }

  onEdgeUpdate = (oldEdge, newConnection) => {
    const customizerStore = store.getState()?.customizerSettingsData;
    const newStore = updateEdge(oldEdge, newConnection, customizerStore);
    store.dispatch(setCustomizerSettingsData(newStore));
  }

  // Запись активного элемента в state
  onElementClick = (event, element) => {
    const elements = store.getState()?.customizerSettingsData ?? [];
    let elementStore = {};
    if (_.isArray(elements)) {
      elements.map(item => {
        if (item.id === element.id) elementStore = item;
      });
    }

    if (isNode(elementStore)) this.setState(s => ({...s, selectNode: elementStore, selectEdge: false}));
    if (isEdge(elementStore)) this.setState(s => ({...s, selectEdge: elementStore, selectNode: false}));
    store.dispatch(setSelectNode(element.type, element.id))
    this.setState(s => ({...s, activePanel: "selected"}));
  }

  changeTab(item) {
    this.setState(s => ({...s, activePanel: item}));
  }

  btnChange(item) {
    this.setState(s => ({...s, btnActive: item}));
  }

  onLayout(item) {
    const elements = store.getState()?.customizerSettingsData;
    // const newElements = _.cloneDeep(elements);

    const layoutedElements = this.getLayoutedElements(elements, item);
    store.dispatch(setCustomizerSettingsData(layoutedElements));
  }

  getLayoutedElements(elements, direction = 'TB') {
    const isHorizontal = direction === 'LR';
    this.dagreGraph.setGraph({rankdir: direction});

    const nodeWidth = 172;
    const nodeHeight = 36;

    elements.forEach((el) => {
      if (isNode(el)) {
        this.dagreGraph.setNode(el.id, {width: nodeWidth, height: nodeHeight});
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

  PaneClick = () => {
    if (this.state.activePanel !== 'widgets') {
      this.setState(state => ({...state, activePanel: "widgets"}));
    }
    store.dispatch(setSelectNode(false, false))
  }

  showMenu(e) {
    contextMenu.show({
      event: e,
      id: "context"
    });
  }

  rightClickNode = async (e, node) => {
    e.preventDefault();
    this.onElementClick(e, node)
    let localObj = await navigator.clipboard?.readText()
    if (localObj && isJSON(localObj)) {
      store.dispatch(setCopyNode(true))
    } else {
      store.dispatch(setCopyNode(false))
    }
    this.showMenu(e)
  }

  rightClickPanel = async (e) => {
    e.preventDefault();
    this.PaneClick()
    let localObj = await navigator.clipboard?.readText()
    if (localObj && isJSON(localObj)) {
      store.dispatch(setCopyNode(true))
    } else {
      store.dispatch(setCopyNode(false))
    }
    this.showMenu(e)
  }

  render() {
    let nodesTypesObj = {}
    let nodesTypesId = ''
    this.props.nodeState.forEach(el => {
      nodesTypesObj[el.name] = el.node
      nodesTypesId += el.name
    })

    nodesTypesObj.nodesTypesId = nodesTypesId
    // console.log(nodesTypesObj);
    return (
      <div className="page__content" key={nodesTypesId}>
        <ReactFlowProvider>
          <Sidebar changeTab={this.changeTab}
                   activePanel={this.state.activePanel}
                   customizer={this.state.customizer}
                   sources={this.state.sources}
                   elements={this.state.elements}
                   selectNode={this.state.selectNode}
                   selectEdge={this.state.selectEdge}
                   onLoad={this.onLoad}
                   btnActive={this.state.btnActive}
                   btnChange={this.btnChange}
                   setSources={this.setSources}
                   onLayout={this.onLayout}
                   updateCustomizer={this.updateCustomizer}
          />
          <div className="content" ref={this.reactFlowRef}>
            <ReactFlow
              elements={this.props.elements}
              onConnect={this.onConnect}
              onElementsRemove={this.onElementsRemove}
              deleteKeyCode={'Delete'}
              onElementClick={this.onElementClick}
              onNodeContextMenu={this.rightClickNode}
              onPaneContextMenu={this.rightClickPanel}
              onPaneClick={(e) => this.PaneClick(e)}
              onLoad={this.onLoad}
              onDrop={this.onDrop}
              onNodeDragStart={this.onNodeDragStart}
              onNodeDragStop={this.onNodeDragStop}
              onDragOver={this.onDragOver}
              nodeTypes={nodesTypesObj}
              onEdgeUpdate={this.onEdgeUpdate}
              // edgeTypes={{
              //   custom: Bezier,
              // }}
              // edgeTypes={{
              //   straight: StraightEdge,
              // }}
              connectionLineType={this.props.lineState.typeLine}
              connectionLineStyle={{stroke: this.props.lineState.colorLine}}
              connectionLineComponent={ConnectionLine}
              selectNodesOnDrag={false}
            >
              <Controls/>
              <MiniMap
                nodeColor={node => {
                  switch (node.type) {
                    case 'condition':
                      return '#FF4E6E';
                    case 'action':
                      return '#315EFB';
                    case 'customizer':
                      return '#87CA00';
                    default:
                      return '#8E94AA';
                  }
                }}
                nodeClassName={node => {
                  switch (node.type) {
                    case 'customizer':
                      return 'customizer-node-map';
                    case 'condition':
                      return 'condition-node-map';
                    default:
                      return 'flow-node';
                  }
                }}
              />
            </ReactFlow>
            <ContextMenuCustomizer
              node={this.state.selectNode}
              disabled={this.state.activePanel}
              deleteNode={this.onElementsRemove}
              reactFlowRef={this.reactFlowRef.current}
              reactFlowInstance={this.state.reactFlowInstance}
            />
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
  ? (_export = CustomizerEditor)
  : (_export = hot(module)(CustomizerEditor));

export default connect(mapStateToProps)(_export);
