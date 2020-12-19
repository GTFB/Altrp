import * as React from "react";

import SidebarItem from "./SidebarItem";

import Scrollbars from "react-custom-scrollbars";

export default class WidgetsPanel extends React.Component {
  render() {
    return (
      <div className="widget-panel-wrapper">
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <div className="widget-panel">
            <SidebarItem
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
              type="end"
              properties={{ body: "End" }}
              ports={{
                port1: {
                  id: "port1",
                  type: "top"
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
              properties={{ body: "Action" }}
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
              type="end"
              properties={{ body: "End" }}
              ports={{
                port1: {
                  id: "port1",
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
          </div>
        </Scrollbars>
      </div>
    );
  }
}
