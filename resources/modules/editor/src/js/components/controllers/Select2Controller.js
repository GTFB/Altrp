import React, { Component, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import controllerDecorate from "../../decorators/controller";
import Resource from "../../classes/Resource";
// в rootElement при создании массива select, value никогда не должно повторятся
class Select2Controller extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.change = this.change.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || '';
    this.state = {
      value,
      options: this.props.options || [],
      show: true
    };
    // if (this.props.options_resource) {
    //   this.resource = new Resource({ route: this.props.options_resource });
    // }
  };

  getDefaultValue() {
    return '';
  }

  /**
   * Загрузим опцию, если есть значение
   * @return {Promise<string>}
   */
  async _componentDidMount(){
    if(this.state.value){
      let resource = new Resource({route: this.getRoute()});
      let options = await resource.search(this.state.value);
      console.log(this.state.value);
      console.log(resource);
      console.log(options);
      this.setState(state => ({
        ...state,
        options
      }));
    }
  }
  /**
   * Получить роут для запросов опций
   * если this.props.options_resource содержит строку с шаблоном,
   * то нужно вставить необходимое значение свзятое из текущего элемента
   */
  getRoute(){
    let route = this.props.options_resource;
    if(! route.match(/{{([^}]*)}}/)){
      return route;
    }
    let settingName = route.match(/{{([^}]*)}}/)[1];
    let match = route.match(/{{([^}]*)}}/)[0];
    let value = this.props.currentElement.getSettings(settingName);
    return route.replace(match, value)
  }
  /**
   * Обновляет опции при помощи ajax
   * @param searchString
   * @param callback
   * @return {Promise<*>}
   */
  async loadOptions(searchString, callback) {
    if (!searchString) {
      return callback([]);
    }
    let resource = new Resource({route: this.getRoute()});
    let options = await resource.search(searchString);
    this.setState(state => ({
      ...state,
      options
    }));
    return callback(options);
  }

  change(value, action) {
    if (action.action === 'select-option') {
      this._changeValue(
        value.value
      );
    }
  };

  render() {
    if (this.state.show === false) {
      return '';
    }

    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "#FFF" : "#8E94AA",
        backgroundColor: state.isSelected ? "#5897fb" : "#FFF",
        fontSize: 13,
        padding: 5,
        height: 20
      }),

      menu: () => ({
        margin: 0,
        padding: 0,
        width: "100%",
        borderRadius: "0px 0px 3px 3px",
        borderWidth: "0px 1px 1px 1px",
        borderStyle: "solid",
        borderColor: "#E5E6EA",
        position: 'absolute'
      }),

      menuList: () => ({
        margin: 0,
        padding: 0,
      }),

      control: (state) => ({
        display: "flex",
        height: 28,
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E5E6EA",
        color: "#8E94AA",
        fontSize: 13,
      }),

      placeholder: () => ({
        color: "#8E94AA",
        fontSize: 13,
        opacity: 1
      }),

      indicatorSeparator: () => ({
        display: "none !important"
      }),

      singleValue: () => ({
        color: "#8E94AA",
      })
    };

    // let value = {};
    this.state.options.forEach(option => {
      if (option.value === value) {
        value = { ...option };
      }
    });
    let selectProps = {
      onChange: this.change,
      onInputChange: this.change,
      options: this.state.options,
      styles: customStyles,
      placeholder: this.props.placeholder,
      loadOptions: this.loadOptions,
      noOptionsMessage: () => "no found",
      value,
    };

    let SelectComponent = Select;
    if (this.props.options_resource) {
      SelectComponent = AsyncSelect;
      selectProps.loadOptions = this.loadOptions;
    }
    return <div className="controller-container controller-container_select2">
      <div className="control-select2-header">
        <div className="control-select2__label">{this.props.label}</div>
      </div>
      <div className="control-container_select2-wrapper">
        <SelectComponent {...selectProps} />
      </div>
    </div>

  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen,
    controllerValue: state.controllerValue,
  };
}
export default connect(mapStateToProps)(Select2Controller);
