import React, {Component} from "react";

class RootComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
  }
  changeSetting(settingName, value){
    let newState = this.state;
    newState.settings[settingName] = value;
    this.setState(newState);
  }
  render(){
    return<div className="sections-wrapper">
      {this.state.children.map(section=>{
        React.createElement(section.componentClass,
          {
            settings: section.settings,
            children: section.children,
            element: section
          }
          );
      })}
    </div>
  }
}

export default RootComponent