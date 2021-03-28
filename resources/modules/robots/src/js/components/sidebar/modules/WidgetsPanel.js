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
    let start = this.issetNode('start');
    let finish = this.issetNode('finish');

  return <div className="widget-panel-wrapper">
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div className="widget-panel">
          {start && <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'start' )} draggable>
            <StartIcon/>
            <p>Start</p>
          </div>}
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'condition' )} draggable>
            <ConditionIcon/>
            <p>Condition</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'documentAction' )} draggable>
            <DocumentIcon/>
            <p>Document</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'crudAction' )} draggable>
            <CrudIcon/>
            <p>CRUD</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'apiAction' )} draggable>
            <ApiIcon/>
            <p>API</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'messageAction' )} draggable>
            <MessageIcon/>
            <p>Message</p>
          </div>
          <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'robot' )} draggable>
            <RobotIcon/>
            <p>Robot</p>
          </div>
          {finish && <div className="robot-widget" onDragStart={(event) => this.onDragStart( event, 'finish' )} draggable>
            <FinishIcon/>
            <p>Finish</p>
          </div>}
        </div>
      </Scrollbars>
    </div>
  }
}
