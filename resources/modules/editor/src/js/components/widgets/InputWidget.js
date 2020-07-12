import React, {Component} from "react";
import { set } from "lodash";
// import InputMask from "react-input-mask";

class InputWidget extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      settings: props.element.getSettings(),
      value: props.element.getSettings().content_default_value || '',
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  onChange(e){
    let value = e.target.value;
    this.setState(state=>({
      ...state,
      value
    }));
  }

  render(){
    let styles = {};
    let label = null;
    /**
     * Если значение загрузилось  динамическое,
     * то используем this.getContent для получение этого динамического значения
     * */
    let value = this.state.value;
    if(value.dynamic){
      value = this.getContent('content_default_value');
    }
    let classLabel = "";
    let styleLabel = {};
    switch (this.state.settings.content_label_position_type) {
      case "top":
        styleLabel = {
            marginBottom: this.state.settings.label_style_spacing.size + this.state.settings.label_style_spacing.unit || 2 + "px"
        };
        classLabel = "";
        break;
      case "bottom":
        styleLabel = {
            marginTop: this.state.settings.label_style_spacing.size + this.state.settings.label_style_spacing.unit || 2 + "px"
        };
        break;
      case "left":
        styleLabel = {
            marginRight: this.state.settings.label_style_spacing.size + this.state.settings.label_style_spacing.unit || 2 + "px"
        };
        classLabel = "altrp-field-label-container-left";
        // this.label.current.classList.add("hello")

        break;
    }

    if(this.state.settings.content_label != null) {
      label = <div className={"altrp-field-label-container " + classLabel} style={styleLabel}><label className="altrp-field-label">{this.state.settings.content_label}</label></div>
    } else {
      label = null
    }

    let required = null;
    if(this.state.settings.content_required) {
      required = <div className="altrp-field-label-container"><label className="altrp-field-required">*</label></div>
    } else {
      required = null
    }

    let autocomplete = "off";
    if(this.state.settings.content_autocomplete) {
      autocomplete = "on";
    } else {
      autocomplete = "off";
    }

    return <div className={"altrp-field-container " + classLabel}>
        {this.state.settings.content_label_position_type == "top" ? label : ""}
        {this.state.settings.content_label_position_type == "left" ? label : ""}
            {/* .altrp-field-label-container */}
        {
          required 
        }
      <input type={this.state.settings.content_type}
             // defaultValue={this.getContent('content_default_value')}
             // value={this.getContent('content_default_value') || ''}
             value={value || ''}
             autoComplete={autocomplete}
             placeholder={this.state.settings.content_placeholder}
             className={"altrp-field " + this.state.settings.position_css_classes}
             onChange={this.onChange}
             id={this.state.settings.position_css_id}
      />
      {/* <InputMask mask="99/99/9999" onChange={this.onChange} value={this.state.value} /> */}
      {
        this.state.settings.content_label_position_type == "bottom" ? label : ""
      }
    </div>
  }
}

export default InputWidget