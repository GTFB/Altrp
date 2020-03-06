import React, {Component} from "react";

class ElementWrapper extends Component {

  render(){
    let classes = `altrp-element altrp-element_${this.props.element.getId()}`;
    return <div className="" >
      {
        React.createElement(this.props.component, {element: this.props.element})
      }
    </div>

  }
}

export default ElementWrapper