import React, {Component} from "react";

class AreaComponent extends Component {
    render(){
      let classes = [`app-popup`];

      console.log(this.props.template.template_settings);
      let rootElement  = window.frontElementsFabric.parseData(this.props.template.data, null, this.props.page, this.props.models);
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