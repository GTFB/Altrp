import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import store from "../../../store/store";
import StartIcon from "../../../../svgs/start.svg";
import SwitchIcon from "../../../../svgs/condition.svg";
import DocumentIcon from "../../../../svgs/document.svg";
import CrudIcon from "../../../../svgs/crud.svg";
import ApiIcon from "../../../../svgs/api.svg";
import MessageIcon from "../../../../svgs/message.svg";
import CustomizerIcon from "../../../../svgs/customizer.svg";
import FinishIcon from "../../../../svgs/finish.svg";
import {connect} from "react-redux";
import Search from "../../../../../../editor/src/svgs/search-editor.svg";


class WidgetsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchNodes: ''
    }

    this.changeSearchField = this.changeSearchField.bind(this)
  }

  onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('reactflow-type', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  // Проверка на наличие в схеме ноды Begin
  issetNode(type) {
    const item = store.getState()?.customizerSettingsData;
    let node = true;

    if (_.isArray(item)) {
      item.map(el =>{
        if(el.type === type) node = false;
      });
    }
    return node;
  }

  changeSearchField(e) {
    this.setState(state => ({
      ...state,
      searchNodes: e.target.value
    }))
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.props.customizerSettingsData.length !== nextProps.customizerSettingsData.length || this.state.searchNodes !== nextState.searchNodes) {
      return true
    } else {
      return false
    }
  }

  render() {
    let start = this.issetNode('start');
    let finish = this.issetNode('return');
    let nodesFilter = this.props.nodeState.filter(item => item.name.includes(this.state.searchNodes.toLowerCase()))

  return <div className="widget-panel-wrapper">
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div className="nodes-panel__search">
          <input
            onChange={this.changeSearchField}
            value={this.state.searchNodes}
            type="text"
            placeholder="Search Node..."
            className="input-search__nodes"
          />
          <Search className='search-icon'/>
        </div>
        {this.props.customizer.type ? (
          <div className="widget-panel">
            {/*{start && <div className="customizer-widget" onDragStart={(event) => this.onDragStart( event, 'start' )} draggable>*/}
            {/*  <StartIcon/>*/}
            {/*  <p>Start</p>*/}
            {/*</div>}*/}
            {/*<div className="customizer-widget" onDragStart={(event) => this.onDragStart( event, 'switch' )} draggable>*/}
            {/*  <SwitchIcon/>*/}
            {/*  <p>Switch</p>*/}
            {/*</div>*/}
            {/*<div className="customizer-widget" onDragStart={(event) => this.onDragStart( event, 'documentAction' )} draggable>*/}
            {/*  <DocumentIcon/>*/}
            {/*  <p>Document</p>*/}
            {/*</div>*/}
            {/*<div className="customizer-widget" onDragStart={(event) => this.onDragStart( event, 'crudAction' )} draggable>*/}
            {/*  <CrudIcon/>*/}
            {/*  <p>CRUD</p>*/}
            {/*</div>*/}
            {/*<div className="customizer-widget" onDragStart={(event) => this.onDragStart( event, 'apiAction' )} draggable>*/}
            {/*  <ApiIcon/>*/}
            {/*  <p>API</p>*/}
            {/*</div>*/}
            {/*<div className="customizer-widget" onDragStart={(event) => this.onDragStart( event, 'messageAction' )} draggable>*/}
            {/*  <MessageIcon/>*/}
            {/*  <p>Message</p>*/}
            {/*</div>*/}
            {/*<div className="customizer-widget" onDragStart={(event) => this.onDragStart( event, 'change' )} draggable>*/}
            {/*  <CustomizerIcon/>*/}
            {/*  <p>Change</p>*/}
            {/*</div>*/}
            {/*{<div className="customizer-widget" onDragStart={(event) => this.onDragStart( event, 'return' )} draggable>*/}
            {/*  <FinishIcon/>*/}
            {/*  <p>Return</p>*/}
            {/*</div>}*/}

            {
              nodesFilter?.length ?
              nodesFilter.map(item => {
              if (item.name === "start" && start) {
                return (
                  <div className="customizer-widget" key={item.name}
                       onDragStart={(event) => this.onDragStart(event, item.name)} draggable>
                    <item.icon/>
                    <p>{item.title}</p>
                  </div>
                )
              } else if (item.name !== "start") {
                return (
                  <div className="customizer-widget" key={item.name} onDragStart={(event) => this.onDragStart( event, item.name )} draggable>
                    <item.icon/>
                    <p>{item.title}</p>
                  </div>
                )
              }
            })
                : <h2 className="widget-panel__text">Not found</h2>
            }
          </div>
        ) : (
          <h2 className="widget-panel__text">Choose Type in settings</h2>
        )}
      </Scrollbars>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    customizerSettingsData: state.customizerSettingsData,
    customizer: state.currentCustomizer,
    nodeState: state.nodeStoreData.nodes
  }
}

export default connect(mapStateToProps)(WidgetsPanel)
