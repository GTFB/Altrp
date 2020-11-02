import React, {Component} from "react";
import {
  altrpCompare, isEditor,
  parseOptionsFromSettings,
  parseParamsFromString
} from "../../../../../front-app/src/js/helpers";
import Resource from "../../classes/Resource";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";
import AltrpModel from "../../classes/AltrpModel";
import { cutString, sortOptions } from "../../helpers";
import {connect} from "react-redux";
const AltrpInput = React.lazy(()=> import("../altrp-input/AltrpInput"));

class InputWidget extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    let value = props.element.getSettings().content_default_value || '';
    this.state = {
      settings: {...props.element.getSettings()},
      value: value,
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
    if(this.props.element.getSettings('content_options')){
      let options = parseOptionsFromSettings(this.props.element.getSettings('content_options'));
      this.setState(state =>({...state, options}));
    } else if((['select','select2'].indexOf(this.state.settings.content_type) >= 0) && this.state.settings.model_for_options){
      let options = await(new Resource({route: this.getRoute()})).getAll();
      options = (! _.isArray(options)) ? options.data : options;
      options = (_.isArray(options)) ? options : [];
      this.setState(state =>({...state, options}));
    }

    let value = this.state.value;
    /**
     * Если динамическое значение загрузилось,
     * то используем this.getContent для получение этого динамического значения
     * */
    if(_.get(value, 'dynamic') && this.props.currentModel.getProperty('altrpModelUpdated')){
      value = this.getContent('content_default_value');
    }
    if(! _.isObject(value)){
      value = this.getContent('content_default_value');
    }
    this.setState(state =>({...state,value}), ()=>{this.dispatchFieldValueToStore(value);});
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
  async _componentDidUpdate(prevProps, prevState){
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
     * Если обновилась модель, то пробрасываем в стор новое значение
     */
    if((! _.isEqual(this.props.currentModel, prevProps.currentModel)) && this.state.value && this.state.value.dynamic ){
      this.dispatchFieldValueToStore(this.getContent('content_default_value'));
    }

    /**
     * Если обновилось хранилище данных формы или модель, то получаем новые опции
     */
    if((this.props.formsStore !== prevProps.formsStore)
        || (this.props.currentModel !== prevProps.currentModel)){
      this.updateOptions();
    }
    this.updateValue(prevProps);
  }

  /**
   * Обновить значение если нужно
   * @param {{}} prevProps
   */
  updateValue(prevProps){
    if(isEditor()){
      return;
    }
    let content_calculation = this.props.element.getSettings('content_calculation');
    if(! content_calculation){
      return
    }
    const fieldName = this.props.element.getSettings('field_id');
    const formId = this.props.element.getSettings('form_id');

    const prevContext = {};

    const altrpdata = this.props.currentDataStorage.getData();
    const altrpforms = this.props.formsStore;
    const altrpmodel = this.props.currentModel.getData();
    const altrpuser = this.props.currentUser.getData();
    const context = {};
    if(content_calculation.indexOf('altrpdata') !== -1){
      context.altrpdata = altrpdata;
      if(! altrpdata.currentDataStorageLoaded){
        prevContext.altrpdata = altrpdata;
      } else {
        prevContext.altrpdata = prevProps.currentDataStorage.getData();
      }
    }
    if(content_calculation.indexOf('altrpforms') !== -1){
      context.altrpforms = altrpforms;
      /**
       * Не производим вычисления, если изменилось текущее поле
       */
      if(`${formId}.${fieldName}` === altrpforms.changedField){
        prevContext.altrpforms = altrpforms;
      } else {
        prevContext.altrpforms = prevProps.formsStore;
      }
    }
    if(content_calculation.indexOf('altrpmodel') !== -1){
      context.altrpmodel = altrpmodel;
      prevContext.altrpmodel = prevProps.currentModel.getData();
    }
    if(content_calculation.indexOf('altrpuser') !== -1){
      context.altrpuser = altrpuser;
      prevContext.altrpuser = prevProps.currentUser.getData();
    }

    // if(_.isEqual(prevContext, context)){
    //   return;
    // }


    if(_.isEqual(prevProps.currentDataStorage, this.props.currentDataStorage)
        &&_.isEqual(prevProps.currentUser, this.props.currentUser)
        &&_.isEqual(prevProps.formsStore, this.props.formsStore)
        &&_.isEqual(prevProps.currentModel, this.props.currentModel)
    ){
      return;
    }
    if(! _.isEqual(prevProps.formsStore, this.props.formsStore) && `${formId}.${fieldName}` === altrpforms.changedField){
      return
    }
    let value = '';
    try {
      content_calculation = content_calculation.replace(/}}/g,'\')').replace(/{{/g,'_.get(context, \'');
      value = eval(content_calculation);
      if(value === this.state.value){
        return;
      }
      this.setState(state =>({...state,value}), ()=>{this.dispatchFieldValueToStore(value);});
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Обновляет опции для селекта при обновлении данных, полей формы
   */
  async updateOptions(){
    {
      let formId = this.props.element.getSettings('form_id');
      let paramsForUpdate = this.props.element.getSettings('params_for_update');
      let formData = _.get(this.props.formsStore, [formId], {});
      paramsForUpdate = parseParamsFromString(paramsForUpdate, new AltrpModel(formData));
      /**
       * Сохраняем параметры запроса, и если надо обновляем опции
       */
      let options = this.state.options;
      if(! _.isEqual(paramsForUpdate, this.state.paramsForUpdate)){
        if(! _.isEmpty(paramsForUpdate)){
          if(this.props.element.getSettings('params_as_filters', false)){
            paramsForUpdate = JSON.stringify(paramsForUpdate);
            options = await (new Resource({route: this.getRoute()})).getQueried({filters:paramsForUpdate});
          } else {
            options = await (new Resource({route: this.getRoute()})).getQueried(paramsForUpdate);
          }
          options = (! _.isArray(options)) ? options.data : options;
          options = (_.isArray(options)) ? options : [];

        } else
        if(this.state.paramsForUpdate){
          options = await (new Resource({route: this.getRoute()})).getAll();
          options = (! _.isArray(options)) ? options.data : options;
          options = (_.isArray(options)) ? options : [];

        }
        // console.log(options);
        // console.log(this.state.value);
        this.setState(state=>({
          ...state,
          paramsForUpdate,
          options,
        }));
      }
    }
  }

  /**
   * Изменение значения в виджете
   * @param e
   */
  onChange(e){
    let value = '';
    if(e && e.target){
      if(this.props.element.getSettings('content_type') === 'checkbox'){
        let inputs = document.getElementsByName(e.target.name);
        value = [];
        inputs.forEach(input=>{
          if(input.checked){
            value.push(input.value);
          }
        })
      } else {
        value = e.target.value;
      }
    }

    if(e && e.value){
      value = e.value;
    }
    if(_.isArray(e)){
      value = _.cloneDeep(e)
    }
    if(this.props.element.getSettings('content_type') === 'select2'){
      if(this.props.element.getSettings('select2_multiple', false) && ! e){
        value = [];
      }
      if(this.props.element.getSettings('select2_multiple', false) ){
        value = value.map(item => item.value);
      }
    }
    this.setState(state=>({
      ...state,
      value
    }), ()=>{
      /**
       * Обновляем хранилище только если не текстовое поле
       */
      if(['text', 'email', 'phone', 'number', 'password'].indexOf(this.state.settings.content_type) === -1){
        this.dispatchFieldValueToStore(value, true);
      }
    });
  }

  /**
   * Потеря фокуса для оптимизации
   */
  onBlur = (e)=>{
    if(['text', 'email', 'phone', 'number', 'password'].indexOf(this.state.settings.content_type) !== -1) {
      this.dispatchFieldValueToStore(e.target.value, true);
    }
  };
  /**
   * Передадим значение в хранилище формы
   * @param {*} value
   * @param {boolean} userInput true - имзенилось пользователем
   */
  dispatchFieldValueToStore = (value, userInput = false) => {
    let formId = this.props.element.getSettings('form_id');
    let fieldName = this.props.element.getSettings('field_id');
    if(_.isObject(this.props.appStore) && fieldName && formId){
      this.props.appStore.dispatch(changeFormFieldValue(fieldName,
          value,
          formId,
          userInput
      ))
    }
  };

  render(){
    let label = null;
    let required = null;
    const { options_sorting } = this.state.settings;

    let value = this.state.value;

    if(_.get(value, 'dynamic') && this.props.currentModel.getProperty('altrpModelUpdated')){
      value = this.getContent('content_default_value');
    }
    /**
     * Пока динамический контент загружается (Еесли это динамический контент),
     * нужно вывести пустую строку
     */
    if(value && value.dynamic){
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
    let input = <React.Suspense fallback={<input />}>
      <AltrpInput type={this.state.settings.content_type}
                  value={value || ''}
                  autoComplete={autocomplete}
                  placeholder={this.state.settings.content_placeholder}
                  className={"altrp-field " + this.state.settings.position_css_classes}
                  settings={this.props.element.getSettings()}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  id={this.state.settings.position_css_id}
    /></React.Suspense>;
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
        let options = this.state.options || [];
        // options = _.sortBy(options, (o => o.label ? o.label.toString() : o));
        input = <select value={value || ''}
                        onChange={this.onChange}
                        id={this.state.settings.position_css_id}
                        className={"altrp-field " + this.state.settings.position_css_classes}>
          {this.state.settings.content_options_nullable ? <option value=""/> : ''}

          {
            (options_sorting ? sortOptions(options, options_sorting) : options)
              .map(option=><option value={option.value} key={option.value}>{option.label}</option>
            )
          }
        </select>
      }
      break;
      case 'select2':{
        input = this.renderSelect2();
      }
      break;
      case 'radio':
      case 'checkbox':{
        input = this.renderRepeatedInput();
      }

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
   * Выводит input type=checkbox|radio
   */
  renderRepeatedInput(){

    const {options = [],} = this.state;
    let { value = ''} = this.state;
    const fieldName = this.props.element.getSettings('field_id') || Math.random().toString(36).substr(2, 9);
    const formID = this.props.element.getSettings('form_id') || Math.random().toString(36).substr(2, 9);
    const inputType = this.props.element.getSettings('content_type', 'radio');
    return <div className="altrp-field-subgroup">
      {
        options.map((option, idx)=>{
          let checked = false;
          /**
           * Если значение или опция число, то приведем к числу перед сравнением
           */
          if(inputType === 'radio'){
            checked = altrpCompare(value, option.value, '==')
          } else {
            value = _.isArray(value) ? value : (value ? [value] : []);
            checked = altrpCompare(option.value, value, 'in');
          }
          return <div className={`altrp-field-option ${checked ? 'active' : ''}`} key={`${fieldName}-${idx}`}>
            <span className="altrp-field-option-span">
              <input type={inputType}
                     value={option.value}
                     name={`${formID}-${fieldName}`}
                     className={`altrp-field-option__input ${checked ? 'active' : ''}`}
                     onChange={this.onChange}
                     checked={checked}
                     id={`${formID}-${fieldName}-${idx}`}/>
            </span>
            <label htmlFor={`${formID}-${fieldName}-${idx}`} className="altrp-field-option__label">{option.label}</label>
          </div>
        })
      }
    </div>;
  }

  /**
   * Выводит инпут-select2, используя компонент AltrpSelect
   */
  renderSelect2() {
    const { 
      content_options_nullable, 
      nulled_option_title, 
      content_placeholder,
    } = this.props.element.getSettings();

    let options = this.state.options;
    if(content_options_nullable){
      options = _.union([{ label: nulled_option_title, value: '', }], options);
    }


    let value = this.state.value;
    if(_.get(value, 'dynamic') && this.props.currentModel.getProperty('altrpModelUpdated')){
      value = this.getContent('content_default_value');
    }
    /**
     * Пока динамический контент загружается, нужно вывести пустую строку
     */
    if(value && value.dynamic){
      value = '';
    }
    if(! this.props.element.getSettings('select2_multiple', false)){
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
    } else {
      /**
       * Если включен мультиселект
       */
      value = value ? (_.isArray(value) ? value : [value]) : [];
      value = value.map(v=>{
        let _v = v;
        options.forEach(option => {
          if (option.value && (option.value.toString() === _v.toString())) {
            _v = { ...option };
          }
          if(_.isArray(option.options)){
            option.options.forEach(option => {
              if (option.value && (option.value.toString() === _v.toString())) {
                _v = { ...option };
              }
            })
          }
        });
        return _v;
      });
      /**
       * Добавим опцию, если для какого-то значения ее нет
       */
      value.forEach(valueItem=>{
        if(! _.isObject(valueItem)){
          options.push({
            value: valueItem,
            label: valueItem,
          });
        }
      })
    }
    /**
     * Сортируем опции
     * @type {Array|*}
     */
    options = _.sortBy(options, (o => o.label ? o.label.toString() : o));
    const select2Props = {
      className: 'altrp-field-select2',
      classNamePrefix: this.props.element.getId() +' altrp-field-select2',
      options,
      onChange: this.onChange,
      value,
      placeholder: content_placeholder,
      isMulti: this.props.element.getSettings('select2_multiple', false),
      // menuIsOpen: true,
    };
    return <AltrpSelect  {...select2Props} />;
  }
}


export default InputWidget
