import React, {Component} from "react";
import WidgetIcon from "./WidgetIcon";


class WidgetsPanel extends Component {
  constructor(props){
    super(props);
    this.state = {widgets: window.elementsManager.getWidgetsList()};
  }
  render() {
    return <div className="widget-panel">
      {
        this.state.widgets.map(widget => {
          return <WidgetIcon element={widget} key={widget.getName()}/>;
        })
      }
    </div>
  }
}

export default WidgetsPanel