import React, {Component} from "react";

class TextWidget extends Component {
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
    return <p className="altrp-text">{this.state.settings.text}</p>;
  }
}

export default TextWidget