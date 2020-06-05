import React, {Component} from "react";

class InputWidget extends Component {

  constructor(props){
    super(props);
    this.change = this.change.bind(this);
    this.state = {
      settings: props.element.getSettings()
    };
    console.log(props.element.getSettings())
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  change(e){
    this.setState({
      settings: {
        content_label: e.target.value 
      }
    })
  }

  render(){
    return<input type={this.state.settings.content_type}
                 value={this.state.settings.content_label || ""}
                 placeholder={this.state.settings.content_placeholder}
                 />;
  }
}

export default InputWidget