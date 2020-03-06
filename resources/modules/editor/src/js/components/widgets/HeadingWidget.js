import React, {Component} from "react";
import decorate from "../../decorators/element-component";

class HeadingWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
    decorate(this);
  }

  render(){
    return<h1 className="heading">{this.state.settings.text}</h1>;
  }
}

export default HeadingWidget