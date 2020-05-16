import React, {Component} from "react";

class AreaComponent extends Component {
    render(){
      let rootElement  = window.frontElementsFabric.parseData(this.props.template.data);
      return <div className="app-area">{
        React.createElement(rootElement.componentClass,
            {
              element: rootElement,
              children: rootElement.children
            })
      }</div>
    }
}

export default AreaComponent