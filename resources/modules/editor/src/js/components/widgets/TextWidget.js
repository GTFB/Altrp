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
    return <div className="altrp-text" dangerouslySetInnerHTML={{__html: this.state.settings.text}}/>;
    
  }
}

export default TextWidget