import React, {Component, useState} from "react";
import {connect} from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import DesktopIcon from '../../../svgs/desktopNew.svg'
import controllerDecorate from "../../decorators/controller";
import Resource from "../../classes/Resource";
// в rootElement при создании массива select, value никогда не должно повторятся
class Select2Controller extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {
      value,
      options: this.props.options || [],
      show: true
    };
    if(this.props.options_resource)
    {
      this.resource = new Resource({route:this.props.options_resource});
    }
    controllerDecorate(this);
  };

  getDefaultValue(){
    return '';
  }

  async loadOptions(searchString, callback){
    if(! searchString){
      return callback([]);
    }
    let options = await this.resource.search(searchString);
    console.log(options);
    this.setState(state=>({
      ...state,
      options
    }));
    return callback(options);
  }

  change(value, action){
    if(action.action === 'select-option'){
      this._changeValue(
          value.value
      );
    }
  };

  render() {

    if(this.state.show === false) {
      return '';
    }

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

    let value = {};
    this.state.options.forEach(option=>{
      if(option.value === this.state.value){
        value = {...option};
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
    if(this.props.options_resource){
      SelectComponent = AsyncSelect;
      selectProps.loadOptions = this.loadOptions;
    }
    return <div className="controller-container controller-container_select2">
      <div className="control-select2-header">
        <div className="control-select2__label">{this.props.label}</div>
        <DesktopIcon className="controller-container__label-svg" width="12"/>
      </div>
      <div className="control-container_select2-wrapper">
        <SelectComponent {...selectProps}/>
      </div>
    </div>

  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(Select2Controller);
