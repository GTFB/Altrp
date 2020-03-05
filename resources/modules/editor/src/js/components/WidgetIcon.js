import React, {Component} from "react";
import BaseElement from "../classes/elements/BaseElement";
import {useDrag} from 'react-dnd'

export default function WidgetIcon(props) {


  if (!props.element instanceof BaseElement) {
    throw 'Widget Component must has Element in props';
  }
  let state = {
    element: props.element,
  };
  return <div className='widget-icon' draggable="true">
    {
      React.createElement(state.element.getIconComponent())
    }
    <div className="widget-icon__title">
      {state.element.getTitle()}
    </div>
  </div>

}

