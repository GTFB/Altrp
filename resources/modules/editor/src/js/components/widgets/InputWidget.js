import React, {Component} from "react";
import {parseOptionsFromSettings} from "../../../../../front-app/src/js/helpers";
import Resource from "../../classes/Resource";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
// import InputMask from "react-input-mask";

class InputWidget extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      settings: {...props.element.getSettings()},
      value: props.element.getSettings().content_default_value || '',
      options: parseOptionsFromSettings(props.element.getSettings('content_options'))
    };
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  /**
   * Загрузка виджета
   */
  async _componentDidMount(){
    // if(this.state.settings.content_type === 'select' && this.state.settings.model_for_options){
    //   let model_for_options = this.props.element.getSettings('model_for_options');
    //   let options = await(new Resource({route: `/ajax/models/${model_for_options}_options`})).getAll();
    //   this.setState(state =>({...state, options}))
    // }
    console.log(this.state.settings.model_for_options);
    if((['select','select2'].indexOf(this.state.settings.content_type) >= 0) && this.state.settings.model_for_options){
      let model_for_options = this.props.element.getSettings('model_for_options');
      let options = await(new Resource({route: `/ajax/models/${model_for_options}_options`})).getAll();
      this.setState(state =>({...state, options}))
    }
  }
  /**
   * Обновление виджета
   */
  async componentDidUpdate(prevProps){
    if(this.props.element.getSettings('content_type') === 'select' && this.props.element.getSettings('model_for_options') ){
      if(this.state.settings.model_for_options === prevProps.element.getSettings('model_for_options')){
        return;
      }
      let model_for_options = prevProps.element.getSettings('model_for_options');
      let options = await (new Resource({route: `/ajax/models/${model_for_options}_options`})).getAll();
      this.setState(state =>({...state, options,model_for_options}))
    }
  }


  /**
   * Изменение значения в виджете
   * @param e
   */
  onChange(e){
    let value = e.target.value;
    this.setState(state=>({
      ...state,
      value
    }));
  }

  render(){
    let label = null;
    let required = null;
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
        classLabel = "";
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

    let input = <input type={this.state.settings.content_type}
                       value={value || ''}
                       autoComplete={autocomplete}
                       placeholder={this.state.settings.content_placeholder}
                       className={"altrp-field " + this.state.settings.position_css_classes}
                       onChange={this.onChange}
                       id={this.state.settings.position_css_id}
    />;
    switch (this.state.settings.content_type) {
      case 'text':
      case 'number':
      case 'date':
      case 'email':
      case 'tel':
      case 'file':{

      }
      break;
      case 'select':{
        input = <select value={value || ''}
                        onChange={this.onChange}
                        id={this.state.settings.position_css_id}
                        className={"altrp-field " + this.state.settings.position_css_classes}>
          {this.state.settings.content_options_nullable ? <option value=""/> : ''}
          {
            this.state.options.map(option=>{
              return <option value={option.value} key={option.value}>{option.label}</option>
            })
          }
        </select>
      }
      break;
      case 'select2':{
        input = this.renderSelect2();
      }
      break;
    }
    return <div className={"altrp-field-container " + classLabel}>
        {this.state.settings.content_label_position_type == "top" ? label : ""}
        {this.state.settings.content_label_position_type == "top" ? required : ""}
        {this.state.settings.content_label_position_type == "left" ? label : ""}
        {this.state.settings.content_label_position_type == "left" ? required : ""}
            {/* .altrp-field-label-container */}
      {input}
      {/* <InputMask mask="99/99/9999" onChange={this.onChange} value={this.state.value} /> */}
      {this.state.settings.content_label_position_type == "bottom" ? label : ""}
      {this.state.settings.content_label_position_type == "bottom" ? required : ""}
    </div>
  }

  /**
   * Выводит инпут-select2, используя компонент AltrpSelect
   */
  renderSelect2() {

    // console.log(AltrpSelect);

    const select2Props = {
      className: 'altrp-field-select2',
      classNamePrefix: 'altrp-field-select2',
      options: this.state.options
    };
    return <AltrpSelect {...select2Props} />;
  }
}

export default InputWidget
