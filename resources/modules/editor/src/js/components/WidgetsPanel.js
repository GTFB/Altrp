import React, { Component } from "react";
import WidgetIcon from "./WidgetIcon";
import Scrollbars from "react-custom-scrollbars";
import {connect} from "react-redux";

class WidgetsPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {elements} = this.props
    let widgets = []
    
    for (let elementName in elements) {
      if (
        elements.hasOwnProperty(elementName) &&
        elements[elementName].getType() === "widget"
      ) {
        widgets.push(elements[elementName]);
      }
    }

    return (
      <div className="widget-panel-wrapper">
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <div className="widget-panel">
            {widgets.map(widget => {
              return <WidgetIcon element={widget} key={widget.getName()} />;
            })}
          </div>
        </Scrollbars>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    elements: state.widgetsManager.elements,
  }
}

export default connect(mapStateToProps)(WidgetsPanel);
