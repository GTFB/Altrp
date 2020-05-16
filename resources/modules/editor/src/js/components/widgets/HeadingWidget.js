import React, {Component} from "react";

class HeadingWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings()
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  render(){
    return <h1 className="heading">{this.state.settings.text}</h1>;
  }
}

export default HeadingWidget