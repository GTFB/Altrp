import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import store from "../../../store/store";
import StartIcon from "../../../../svgs/start.svg";
import ConditionIcon from "../../../../svgs/condition.svg";
import DocumentIcon from "../../../../svgs/document.svg";
import CrudIcon from "../../../../svgs/crud.svg";
import ApiIcon from "../../../../svgs/api.svg";
import MessageIcon from "../../../../svgs/message.svg";
import RobotIcon from "../../../../svgs/robot.svg";
import FinishIcon from "../../../../svgs/finish.svg";


export default class WidgetsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('reactflow-type', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  // Проверка на наличие в схеме ноды Begin
  issetNode(type) {
    const item = store.getState()?.robotSettingsData;
    let node = true;

    if (_.isArray(item)) {
      item.map(el =>{
        if(el.type === type) node = false;
      });
    }
    return node;
  }

  render() {
    let begin = this.issetNode('begin');
    let end = this.issetNode('end');

  return <div className="widget-panel-wrapper">
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div className="widget-panel">
          {begin && <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'begin' )} draggable>
            <StartIcon/>
            <p>Start</p>
          </div>}
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'condition' )} draggable>
            <ConditionIcon/>
            <p>Condition</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'document-action' )} draggable>
            <DocumentIcon/>
            <p>Document</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'crud-action' )} draggable>
            <CrudIcon/>
            <p>CRUD</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'api-action' )} draggable>
            <ApiIcon/>
            <p>API</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'message-action' )} draggable>
            <MessageIcon/>
            <p>Message</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'robot' )} draggable>
            <RobotIcon/>
            <p>Robot</p>
          </div>
          {/*<div className="react-flow__node-output" onDragStart={(event) => this.onDragStart( event, 'condition' )} draggable>*/}
          {/*  Condition*/}
          {/*</div>*/}
          {/*<div className="react-flow__node-input" onDragStart={(event) => this.onDragStart( event, 'action' )} draggable>*/}
          {/*  Action*/}
          {/*</div>*/}
          {/*<div className="react-flow__node-input" onDragStart={(event) => this.onDragStart( event, 'robot' )} draggable>*/}
          {/*  Robot*/}
          {/*</div>*/}
          {end && <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'end' )} draggable>
            <FinishIcon/>
            <p>Finish</p>
          </div>}
        </div>
      </Scrollbars>
    </div>
  }
}
