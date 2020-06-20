import React, {Component} from "react";

class ElementWrapper extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let classes = `altrp-element altrp-element${this.props.element.getId()} altrp-element_${this.props.element.getType()}`;
    if(this.props.element.getType() === 'widget'){
      classes += ` altrp-widget_${this.props.element.getName()}`;
    }
    return <div className={classes}>
      {
        React.createElement(this.props.component, {
          element: this.props.element,
          children: this.props.element.getChildren(),
        })
      }
    </div>
  }
}

export default ElementWrapper;
