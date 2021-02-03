import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import store from "../../store/store"

export default class WidgetsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('reactflow-type', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  // Проверка на наличие в схеме ноды Begin
  issetBegin() {
    const item = store.getState()?.robotSettingsData;
    let begin = true;

    item.map(el =>{
      if(el.type === "begin") begin = false;
    });

    return begin;
  }

  render() {
    let begin = this.issetBegin();

  return <div className="widget-panel-wrapper">
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div className="widget-panel">
        <aside>
          <div className="description">You can drag these nodes to the pane on the right.</div>
          {begin && <div className="react-flow__node-default" onDragStart={(event) => this.onDragStart( event, 'begin' )} draggable>
            Begin
          </div>}
          <div className="react-flow__node-output" onDragStart={(event) => this.onDragStart( event, 'condition' )} draggable>
            Condition
          </div>
          <div className="react-flow__node-input" onDragStart={(event) => this.onDragStart( event, 'action' )} draggable>
            Action
          </div>
          <div className="react-flow__node-default" onDragStart={(event) => this.onDragStart( event, 'end' )} draggable>
            End
          </div>
        </aside>
        </div>
      </Scrollbars>
    </div>
  }
}
