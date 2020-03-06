import React, {Component} from "react";
import ElementWrapper from "./ElementWrapper";
import {isEditor} from "../helpers";

class RootComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      children: props.children,
      settings: {

      }
    };
    props.element.component = this;
  }
  changeSetting(settingName, value){
    let newState = this.state;
    newState.settings[settingName] = value;
    this.setState(newState);
  }
  render(){
    return<div className="sections-wrapper">{
      this.state.settings.text
    }<br/>

      {this.state.children.map(
          section => <ElementWrapper component={section.componentClass} element={section}/>
      )}
    </div>
  }
}

export default RootComponent