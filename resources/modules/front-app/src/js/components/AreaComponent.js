import React, {Component} from "react";

class AreaComponent extends Component {
    render(){
      let rootElement  = window.frontElementsFabric.parseData(this.props.template.data, null, this.props.page);
      let classes = [`app-area`, `app-area_${this.props.id}`];
      return <div className={classes.join(' ')}>{
        React.createElement(rootElement.componentClass,
            {
              element: rootElement,
              children: rootElement.children
            })
      }</div>
    }
}

export default AreaComponent