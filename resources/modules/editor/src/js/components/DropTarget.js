import React, {Component} from 'react';
import NewSection from "./NewSection";
import TemplateContent from "./TemplateContent";
import {useDrop} from 'react-dnd'

export default function DropTarget(props) {
  const [status, drop] = useDrop({
    accept: 'icon',
    drop: () => ({name: 'DropTarget'}),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      monitor
    }),
  });
  // console.log(status);
  return <div className="drop-target" ref={drop}>
    {/*<TemplateContent/>*/}
    {/*<NewSection/>*/}
    {props.children}
  </div>;
}