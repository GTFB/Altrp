import React, {Component} from "react";
import {parseOptionsFromSettings, parseParamsFromString} from "../../../../../front-app/src/js/helpers";
import Resource from "../../classes/Resource";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpModel from "../../classes/AltrpModel";

class InputWidget extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      settings: {...props.element.getSettings()},
      value: props.element.getSettings().content_default_value || '',
      options: parseOptionsFromSettings(props.element.getSettings('content_options')),
      paramsForUpdate: null,
    };
    if(props.element.getSettings('content_default_value')){
      this.dispatchFieldValueToStore(props.element.getSettings('content_default_value'));
    }
    props.element.component = this;
    if(window.elementDecorator){
      window.elementDecorator(this);
    }
  }

  /**
   * Загрузка виджета
   */
  async _componentDidMount(){
    if((['select','select2'].indexOf(this.state.settings.content_type) >= 0) && this.state.settings.model_for_options){
      let options = await(new Resource({route: this.getRoute()})).getAll();
      options = (! _.isArray(options)) ? options.data : options;
      options = (_.isArray(options)) ? options : [];
      this.setState(state =>({...state, options}))
    }
  }

  /**
   * Получить url для запросов
   */
  getRoute(){
    let url = this.props.element.getSettings('model_for_options');

    if(url.indexOf('/') === -1){
      return `/ajax/models/${url}_options`
    }
    return url;
  }
  /**
   * Обновление виджета
   */
  async componentDidUpdate(prevProps, prevState){
    if(this.props.element.getSettings('content_type') === 'select' && this.props.element.getSettings('model_for_options') ){
      if(! (this.state.settings.model_for_options === prevProps.element.getSettings('model_for_options'))) {
        let model_for_options = prevProps.element.getSettings('model_for_options');
        let options = await (new Resource({route: this.getRoute()})).getAll();
        options = (!_.isArray(options)) ? options.data : options;
        options = (_.isArray(options)) ? options : [];
        this.setState(state => ({...state, options, model_for_options}))
      }
    }
    /**
     * Если обновилось  хранилище данных форм
     */
    if(this.props.formsStore !== prevProps.formsStore){
      let formId = this.props.element.getSettings('form_id');
      let paramsForUpdate = this.props.element.getSettings('params_for_update');
      let formData = _.get(this.props.formsStore, [formId], {});
      paramsForUpdate = parseParamsFromString(paramsForUpdate, new AltrpModel(formData));
      /**
       * Сохраняем параметры запроса, и если надо обновляем опции
       */
      let options = this.state.options;
      let value = this.state.value;
      if(! _.isEqual(paramsForUpdate, this.state.paramsForUpdate)){
        if(! _.isEmpty(paramsForUpdate)){
          if(this.props.element.getSettings('params_as_filters', false)){
            paramsForUpdate = JSON.stringify(paramsForUpdate);
            options = await (new Resource({route: this.getRoute()})).getQueried({filters:paramsForUpdate});
          } else {
            options = await (new Resource({route: this.getRoute()})).getQueried(paramsForUpdate);
          }
          options = (!_.isArray(options)) ? options.data : options;
          options = (_.isArray(options)) ? options : [];
          if(! options.length){
            value = '';
          }
        } else
        if(this.state.paramsForUpdate){
          options = await (new Resource({route: this.getRoute()})).getAll();
          options = (! _.isArray(options)) ? options.data : options;
          options = (_.isArray(options)) ? options : [];
          if(! options.length){
            value = '';
          }
        }
      }
      this.setState(state=>({
        ...state,
        paramsForUpdate,
        options,
        value
      }));
    }
  }


  /**
   * Изменение значения в виджете
   * @param e
   */
  onChange(e){
    let value = '';
    if(e.target){
      value = e.target.value;
    }

    if(e.value){
      value = e.value;
    }
    this.setState(state=>({
      ...state,
      value
    }), ()=>{this.dispatchFieldValueToStore(value);});
  }

  /**
   * Передадим значение в хранилище формы
   */
  dispatchFieldValueToStore = (value) => {
    let formId = this.props.element.getSettings('form_id');
    let fieldName = this.props.element.getSettings('field_id');
    if(_.isObject(this.props.appStore) && fieldName && formId){
      this.props.appStore.dispatch(changeFormFieldValue(fieldName,
          value,
          formId
      ))
    }
  };

  render(){
    let label = null;
    let required = null;

    let value = this.state.value;
    /**
     * Если динамическое значение загрузилось,
     * то используем this.getContent для получение этого динамического значения
     * */
    if(value.dynamic && this.props.currentModel.getProperty('altrpModelUpdated')){
      value = this.getContent('content_default_value');
    }
    /**
     * Пока динамический контент загружается, нужно вывести пустую строку
     */
    if(value.dynamic){
      value = '';
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
    const { content_options_nullable, nulled_option_title, content_placeholder } = this.state.settings;
    let options = this.state.options;
    if(content_options_nullable){
      options = _.union([{ label: nulled_option_title, value: 'all', }], options);
    }


    let value = this.state.value;
    /**
     * Если динамическое значение загрузилось,
     * то используем this.getContent для получение этого динамического значения
     * */
    if(value.dynamic && this.props.currentModel.getProperty('altrpModelUpdated')){
      value = this.getContent('content_default_value');
    }
    /**
     * Пока динамический контент загружается, нужно вывести пустую строку
     */
    if(value.dynamic){
      value = '';
    }

    options.forEach(option => {
      if (option.value === value) {
        value = { ...option };
      }
      if(_.isArray(option.options)){
        option.options.forEach(option => {
          if (option.value === value) {
            value = { ...option };
          }
        })
      }
    });
    const select2Props = {
      className: 'altrp-field-select2',
      classNamePrefix: 'altrp-field-select2',
      options,
      onChange: this.onChange,
      value,
      // menuIsOpen: true,
      placeholder: content_placeholder,
      // closeMenuOnScroll: true,
    };
    return <AltrpSelect {...select2Props} />;
  }
}

export default InputWidget
