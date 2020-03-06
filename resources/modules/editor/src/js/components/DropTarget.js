import React, {Component} from 'react';
import NewSection from "./NewSection";
import TemplateContent from "./TemplateContent";

export default function DropTarget(props) {

  // console.log(status);
  return <div className="drop-target" >
    {/*<TemplateContent/>*/}
    {/*<NewSection/>*/}
    {props.children}
  </div>;
}