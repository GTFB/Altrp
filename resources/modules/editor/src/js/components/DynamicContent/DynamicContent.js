import React, {Component} from "react";
import ('./DynamicContent.scss');
import ('./../../../sass/altrp-menu.scss');
import {connect} from "react-redux";
import Resource from "../../classes/Resource";
import AltrpSelect from "../../../../../admin/src/components/altrp-select/AltrpSelect";
import CONSTANTS from "../../consts";
import {changeTemplateStatus} from "../../store/template-status/actions";
import store from "../../store/store";

const DATA_TYPES_OPTIONS = [
  {
    value: 'array',
    label: 'Array'
  },
];
const MORPHS_TYPES_OPTIONS = {
  /**
   * @see {ArrayConverter}
   * @link https://altrp.com/layouts/converters
   */
  array: [
    {
      /**
       * @see {ArrayConverter#extract}
       */
      label: 'Extract',
      value: 'extract',
    },
    {
      /**
       * @see {ArrayConverter#map}
       */
      label: 'Map',
      value: 'map',
    },
  ],
};
/**
 * Класс реализующий список динамических конверторов для данных
 */
class DynamicContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      };
    this.resource = new Resource({route: '/admin/ajax/models_with_fields_options'});
  }

  componentDidMount(){
    this.updateDynamicValue();
  }

  /**
   * Сохранйем значение в свойства элемента
   */
  setSettings(){
    store.dispatch(changeTemplateStatus(CONSTANTS.TEMPLATE_NEED_UPDATE));
    this.props.currentElement.setDynamicSetting(this.props.settingName, this.state.value);
  }
  /**
   * Чтобы не закрывалось предотвращаем всплытие клика
   * @param e
   */
  wrapperClickHandler = (e)=>{
    e.stopPropagation();
  };
  /**
   * Обновляем значение при смене свойства или активного элемента (this.props.currentElement)
   */
  updateDynamicValue(){
    if(! this.props.settingName || ! this.props.currentElement){
      return;
    }
    let value = this.props.currentElement.getDynamicSetting(this.props.settingName);
    if(! value){
      value = {};
    }
    this.setState(state => ({...state, value}));
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.currentElement !== prevProps.currentElement){
      this.updateDynamicValue();
    }
    if(this.props.settingName !== prevProps.settingName){
      this.updateDynamicValue();
    }
  }
  getPositionProps(){
    let element = this.props.element;
    if(! element){
      return{top:0, left:7};
    }
    return{
      top: element.offsetTop + element.offsetHeight + 2,
      left:7
    };
  }

  /**
   * Сменим тип данных
   * @param {{}} e
   */
  typeChange = (e) => {
    let value = {...this.state.value};
    if(! e){
      _.unset(value, 'data_type')
    } else {
      value.data_type = e.value;
    }
    _.unset(value, 'convert_type');
    this.setState(state => ({...state, value}), this.setSettings);
  };
  /**
   * Сменим тип данных
   * @param {{}} e
   */
  convertChange = (e) => {
    let value = {...this.state.value};
    if(! e){
      _.unset(value, 'convert_type')
    } else {
      value.convert_type = e.value;
    }
    this.setState(state => ({...state, value}), this.setSettings);
  };
  /**
   * Сменим аргумент
   * @param {number} index
   * @param {string} argument
   */
  changeArgument = (index, argument) => {
    let value = {...this.state.value};
    if(! argument){
      _.unset(value, `argument${index || 1}`)
    } else {
      value[`argument${index || 1}`] = argument;
    }
    this.setState(state => ({...state, value}), this.setSettings);
  };

  render() {
    let classes = ['altrp-dynamic-content'];
    if(this.props.show){
      classes.push('altrp-dynamic-content_show')
    }
    const {data_type, convert_type, argument1} = this.state.value;

    let selectDataTypeProps = {
      onChange: this.typeChange,
      value: _.find(DATA_TYPES_OPTIONS, item => item.value === data_type) || null,
      options: DATA_TYPES_OPTIONS,
      classNamePrefix: 'dynamic-select',
      placeholder: 'Choose Data Type',
      noOptionsMessage: () => "no found",
      isClearable: true,
    };
    let convertsOptions = MORPHS_TYPES_OPTIONS[data_type] || [];
    let selectConvertTypeProps = {
      onChange: this.convertChange,
      value: _.find(convertsOptions, item => item.value === convert_type) || null,
      options: convertsOptions,
      classNamePrefix: 'dynamic-select',
      placeholder: 'Choose Data Type',
      noOptionsMessage: () => "no found",
      isClearable: true,
    };
    return <div className={classes.join(' ')}  style={this.getPositionProps()} onClick={this.wrapperClickHandler}>
    <div className="controller-container controller-container_select2">
      <div className="control-select2-header">
        <div className="control-select2__label">Select Type</div>
      </div>
      <div className="control-container_select2-wrapper">
        <AltrpSelect isClearable={true} {...selectDataTypeProps} />
      </div>
    </div>
      {convertsOptions.length ? <div className="controller-container controller-container_select2">
        <div className="control-select2-header">
          <div className="control-select2__label">Data Converts</div>
        </div>
        <div className="control-container_select2-wrapper">
          <AltrpSelect isClearable={true} {...selectConvertTypeProps} />
        </div>
      </div> : null}
      {data_type && <div className="controller-container controller-container_textarea">
        <div className="controller-container__label">
          Argument № 1
        </div>
        <textarea className="controller-container__textarea"
                  value={argument1 || ''}
                  onChange={(e) => {this.changeArgument(1, e.target.value)}} />
      </div>}
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state.dynamicContentState,
    settingName: _.get(state.dynamicContentState, 'params.settingName'),
    currentElement: state.currentElement.currentElement
  };
}

export default connect(mapStateToProps)(DynamicContent);
