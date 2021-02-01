import * as React from "react";
import SidebarItem from "./SidebarItem";
import Scrollbars from "react-custom-scrollbars";
import store from "../../store/store"

export default class WidgetsPanel extends React.Component {
  onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }
  render() {


    return (
      <div className="widget-panel-wrapper">
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <div className="widget-panel">
          <aside>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="dndnode input" onDragStart={(event) => this.onDragStart(event, 'input')} draggable>
              Input Node
            </div>
            <div className="dndnode" onDragStart={(event) => this.onDragStart(event, 'default')} draggable>
              Default Node
            </div>
            <div className="dndnode output" onDragStart={(event) => this.onDragStart(event, 'output')} draggable>
              Output Node
            </div>
          </aside>

            {/* <SidebarItem
              type="begin"
              properties={{ body: "Begin" }}
              ports={{
                port1: {
                  id: "port1",
                  type: "bottom"
                }
              }}
            />
            <SidebarItem
              type="condition"
              properties={{ body: "if (...)" }}
              ports={{
                yes: {
                  id: "yes",
                  type: "bottom"
                },
                no: {
                  id: "no",
                  type: "right"
                },
                pipe: {
                  id: "pipe",
                  type: "top"
                }
              }}
            />
            <SidebarItem
              type="action"
              properties={{ 
                body: "Action",
                data: store.getState()?.robotSettingsData || []
              }}
              ports={{
                port1: {
                  id: "port1",
                  type: "bottom"
                },
                port2: {
                  id: "port2",
                  type: "left"
                },
                port3: {
                  id: "port3",
                  type: "right"
                },
                port4: {
                  id: "port4",
                  type: "top"
                }
              }}
            />
            <SidebarItem
              type="loop"
              properties={{ body: "for (...)" }}
              ports={{
                port1: {
                  id: "port1",
                  type: "right"
                },
                port2: {
                  id: "port2",
                  type: "left"
                },
                port3: {
                  id: "port3",
                  type: "bottom"
                },
                port4: {
                  id: "port4",
                  type: "top"
                }
              }}
            />
            <SidebarItem
              type="end"
              properties={{ body: "End" }}
              ports={{
                port1: {
                  id: "port1",
                  type: "top"
                }
              }}
            /> */}
          </div>
        </Scrollbars>
      </div>
    );
  }
}
