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
    return React.createElement(this.state.settings.text_settings_html_tag, {className: "altrp-text"}, this.state.settings.text);
    
  }
}

export default TextWidget