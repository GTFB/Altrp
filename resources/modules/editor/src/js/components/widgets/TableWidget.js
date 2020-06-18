import React, {Component} from "react";

class TableWidget extends Component {
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
    console.log(this.state.settings);
    return React.createElement(this.state.settings.heading_settings_html_tag || 'h1', {className: "altrp-heading"}, this.state.settings.text);
  }
}

export default TableWidget

