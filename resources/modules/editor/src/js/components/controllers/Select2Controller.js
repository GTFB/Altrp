import React, {Component, useState} from "react";
import {connect} from "react-redux";
import Select from "react-select";
import DesktopIcon from '../../../svgs/desktopNew.svg'
import controllerDecorate from "../../decorators/controller";
// в rootElement при создании массива select, value никогда не должно повторятся 
class Select2Controller extends Component {
  constructor(props) {
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
  };

  render() {

    const {selectValue} = useState;

    function change() {
      this.setState({
        value: selectValue
      })
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
        borderRadius: "0px 0px 3px 3px",
        borderWidth: "0px 1px 1px 1px",
        borderStyle: "solid",
        borderColor: "#E5E6EA",
      }),

      menuList: () => ({
        margin: 0,
        padding: 0
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

    return <div className="controller-container controller-container_select2">
      <div className="control-select2-header">
        <div className="control-slider__label-select2">{this.props.label}</div>
        <DesktopIcon className="conntroller-container__label-svg" width="12"/>
      </div>
      <div className="control-container_select2-wrapper">
        <Select
          onChange={selectValue}
          onInputChange={this.change}
          options={this.props.options}
          styles={customStyles}
          placeholder={this.props.placeholder}
          noOptionsMessage={() => "тут пусто"}
        />
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
