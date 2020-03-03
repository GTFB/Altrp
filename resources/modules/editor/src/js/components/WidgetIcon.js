import React, {Component} from "react";
import BaseElement from "../classes/elements/BaseElement";
import {useDrag} from 'react-dnd'

export default function WidgetIcon(props) {
  const [{opacity}, dragRef] = useDrag({
    item: {type: 'icon', text: 'text'},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    end:(item, monitor)=>{
      const dropResult = monitor.getDropResult();
      console.log(monitor.internalMonitor.registry);
      console.log(monitor.internalMonitor.registry);
      // console.log(monitor.canDrag());
    }
  });

  if (!props.element instanceof BaseElement) {
    throw 'Widget Component must has Element in props';
  }
  let state = {
    element: props.element,
  };
  return <div className='widget-icon'
              onMouseUp={(e)=>{
                console.log(e);
              }
              }
              ref={dragRef}
              style={{opacity}}>
    {
      React.createElement(state.element.getIconComponent())
    }
    <div className="widget-icon__title">
      {state.element.getTitle()}
    </div>
  </div>

}

