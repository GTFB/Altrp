import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import store from "../../../store/store"

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
        <aside>
          {begin && <div className="flow-node" onDragStart={(event) => this.onDragStart( event, 'begin' )} draggable>
            Begin
          </div>}
          <div className="react-flow__node-output" onDragStart={(event) => this.onDragStart( event, 'condition' )} draggable>
            Condition
          </div>
          <div className="react-flow__node-input" onDragStart={(event) => this.onDragStart( event, 'action' )} draggable>
            Action
          </div>
          <div className="react-flow__node-input" onDragStart={(event) => this.onDragStart( event, 'robot' )} draggable>
            Robot
          </div>
          {end && <div className="flow-node" onDragStart={(event) => this.onDragStart( event, 'end' )} draggable>
            End
          </div>}
        </aside>
        </div>
      </Scrollbars>
    </div>
  }
}
