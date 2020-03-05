import React, {Component} from "react";
import BaseElement from "../classes/elements/BaseElement";

export default class WidgetIcon  extends  Component{
  constructor(props){
    super(props);

    this.state = {
      element: this.props.element,
    };
    this.onDragStart = this.onDragStart.bind(this);
  }
  onDragStart(e){
    console.log(e.dataTransfer);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData('text/plain', this.state.element.getName());
  }
  render() {
    if (!this.state.element instanceof BaseElement) {
      throw 'Widget Component must has Element in props';
    }
    return <div className='widget-icon' draggable="true" onDragStart={this.onDragStart}>
      {
        React.createElement(this.state.element.getIconComponent())
      }
      <div className="widget-icon__title">
        {this.state.element.getTitle()}
      </div>
    </div>
  }
}

