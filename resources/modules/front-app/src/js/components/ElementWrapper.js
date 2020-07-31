import React, {Component} from "react";
import { withRouter } from "react-router-dom";

class ElementWrapper extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let classes = `altrp-element altrp-element${this.props.element.getId()} altrp-element_${this.props.element.getType()}`;
    classes += this.props.element.getPrefixClasses() + " ";
    if(this.props.element.getType() === 'widget'){
      classes += ` altrp-widget_${this.props.element.getName()}`;
    }
    return <div className={classes}>
      {
        React.createElement(this.props.component, {
          element: this.props.element,
          children: this.props.element.getChildren(),
          match: this.props.match,
        })
      }
    </div>
  }
}

export default withRouter(ElementWrapper);
