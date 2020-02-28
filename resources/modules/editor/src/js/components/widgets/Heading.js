import React, {Component} from "react";

class Heading extends Component {
  constructor(props){
    super(props);
    props.element.component = this;
    this.state = {
      name: props.settings.name ||  props.element.getTitle(),
      classNames: props.settings.classNames || [],
    };
  }
  render(){
    return<div className="widget-container {getClassNames(this.state.classNames)}">
      <div className="heading">{this.state.name}</div>
    </div>;
  }
}

export default Heading