import React, {Component} from "react";

class ElementWrapper extends Component {

  render(){
    let classes = `altrp-element altrp-element${this.props.element.getId()}`;
    return <div className={classes}
                data-element-id={this.props.element.getId()}
                data-element-type={this.props.element.getType()}>
      {
        React.createElement(this.props.component, {
          element: this.props.element,
          children: this.props.element.getChildren(),
        })
      }
    </div>

  }
}

export default ElementWrapper