import React, {Component} from "react";

class InputWidget extends Component {

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
    return<input type="text"
                 value={this.state.settings.default_value || ''}/>;
  }
}

export default InputWidget