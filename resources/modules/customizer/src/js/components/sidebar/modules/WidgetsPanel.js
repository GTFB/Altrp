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


class WidgetsPanel extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    let start = this.issetNode('start');
    let finish = this.issetNode('return');

  return <div className="widget-panel-wrapper">
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
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
            {this.props.nodeState.map(item => {
              if (item.name === "start" && start) {
                return (
                  <div className="customizer-widget" key={item.name} onDragStart={(event) => this.onDragStart( event, item.name )} draggable>
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
            })}
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
    customizer: state.currentCustomizer,
    nodeState: state.nodeStoreData.nodes
  }
}

export default connect(mapStateToProps)(WidgetsPanel)
