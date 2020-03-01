import React, {Component} from "react";
import BaseElement from "../classes/elements/BaseElement";

class WidgetIcon extends Component {
  constructor(props){
    super(props);
    if(!props.element instanceof BaseElement){
      throw 'Widget Component must has Element in props';
    }
    this.state = {
      element: props.element,
    };
  }
  render(){
    return <div className='widget-icon'>
      {
        React.createElement(this.state.element.getIconComponent())
      }
      <div className="widget-icon__title">
        {this.state.element.getTitle()}
      </div>
    </div>
  }
}

export default WidgetIcon