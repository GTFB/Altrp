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
    let label = null;

    if(this.state.settings.content_label != null) {
      label = <div className="altrp-field-label-container"><label className="altrp-field-label">{this.state.settings.content_label}</label></div>
    } else {
      label = null
    }

    let required = null;
    if(this.state.settings.content_required) {
      required = <div className="altrp-field-label-container"><label className="altrp-field-required">*</label></div>
    } else {
      required = null
    }

    let autocomplete = "off"
    if(this.state.settings.content_autocomplete) {
      autocomplete = "on"
    } else {
      autocomplete = "off"
    }

    return <div className="altrp-field-container">
      <div className="altrp-field-container-label">
        {
          label
        }
        {
          required 
        }
      </div>
      <input type={this.state.settings.content_type}
        value={this.state.settings.content_default_value}
        autocomplete={autocomplete}
        placeholder={this.state.settings.content_placeholder}
        className={"altrp-field " + this.state.settings.position_css_classes}
        id={this.state.settings.position_css_id}
      />
    </div>
  }
}

export default InputWidget