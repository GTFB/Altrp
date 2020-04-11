import React, {Component} from "react";

class HeadingWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      children: props.children,
      settings: props.element.getSettings()
    };
    props.element.component = this;
  }

  render(){
    return <h1 className="heading">{this.state.settings.text}</h1>;
  }
}

export default HeadingWidget