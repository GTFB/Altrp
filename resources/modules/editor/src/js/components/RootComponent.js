import React, {Component} from "react";

class RootComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      children: props.children,
    };
    props.element.component = this;
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