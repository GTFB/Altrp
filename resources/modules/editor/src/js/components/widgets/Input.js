import React, {Component} from "react";

class Input extends Component {

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
    return<input/>;
  }
}

export default Input