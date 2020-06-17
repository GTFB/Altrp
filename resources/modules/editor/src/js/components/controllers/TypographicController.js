import React, {Component} from "react";
import {connect} from "react-redux";
import { SketchPicker } from "react-color"
import DynamicIcon from '../../../svgs/dynamic.svg'
import ContentIcon from '../../../svgs/content.svg'
import Select from "react-select";
import HistoryIcon from '../../../svgs/history.svg'
import controllerDecorate from "../../decorators/controller";

class TypographicController extends Component {
  constructor(props){
    super(props);
    this.openTypographic = this.openTypographic.bind(this);
    this.changeFamily = this.changeFamily.bind(this);
    this.weightChange = this.weightChange.bind(this);
    this.styleChange = this.styleChange.bind(this);
    this.decorationChange = this.decorationChange.bind(this);
    this.transformChange = this.transformChange.bind(this);
    this.inputBlurUpdate = this.inputBlurUpdate.bind(this);
    this.blurChange = this.blurChange.bind(this);
    this.inputHorUpdate = this.inputHorUpdate.bind(this);
    this.horChange = this.horChange.bind(this);
    this.verChange = this.verChange.bind(this);
    this.inputVerUpdate = this.inputVerUpdate.bind(this)
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || false;
    this.state = {
      value,
      //size
      sizeMin: this.props.sizeMin || 0,
      sizeMax: this.props.sizeMax || 200,
      //lineHeight
      lineHeightMax: this.props.lineHeightMax || 10,
      lineHeightMin: this.props.lineHeightMax || 0.1,
      //spacing
      spacingMax: this.props.spacingMax || 10,
      spacingMin: this.props.spacingMin || -5,
    };
    controllerDecorate(this);
  }

  getDefaultValue(){
    return {
    };
  }

  openTypographic(){
    let shadowContainer = document.getElementById("shadowContainer")
    let shadowContentIcon = document.getElementById("shadowContentIcon");

    shadowContainer.classList.toggle("control-shadow-active");
    
    if(shadowContentIcon.getAttribute("fill") == "#8E94AA") {
      shadowContentIcon.removeAttribute("fill");
      shadowContentIcon.setAttribute("fill", "#5bc0de");
    } else {
      shadowContentIcon.removeAttribute("fill");
      shadowContentIcon.setAttribute("fill", "#8E94AA");
    }
  }
  //начало select2
  changeFamily(value){
    this._changeValue({
      ...this.state.value,
      family: value
    })
  };
  //конец select2
  //начало size
  inputBlurUpdate (e) {
    this._changeValue({
      ...this.state.value,
      size:e.target.value
    });
  }

  blurChange(e) {
    this._changeValue({
      ...this.state.value,
      size:e.target.value
    });
    // console.log(this.state.value)
  };
  //конец size
  //начало weight
  weightChange(e) {
    this._changeValue({
      ...this.state.value,
      weight:e.target.value,
    });
  }
  //конец weight
  //начало transform
  transformChange(e) {
    this._changeValue({
      ...this.state.value,
      transform:e.target.value,
    });
  }
  //конец transform
  //начал style
  styleChange(e) {
    this._changeValue({
      ...this.state.value,
      style:e.target.value,
    });
  }
  //конец style
  //начало decoration
  decorationChange(e) {
    this._changeValue({
      ...this.state.value,
      decoration:e.target.value,
    });
  }
  //конец decoration
  //начало lineHeight
  inputHorUpdate (e) {
    this._changeValue({
      ...this.state.value,
      lineHeight:e.target.value
    });
  }

  horChange(e) {
    this._changeValue({
      ...this.state.value,
      lineHeight:e.target.value
    });
    // console.log(this.state.value)
  };
  //конец lineHeight
  //начало letter spacing
  inputVerUpdate(e) {
    this._changeValue({
      ...this.state.value,
      spacing:e.target.value
    });
  }

  verChange(e) {
    this._changeValue({
      ...this.state.value,
      spacing:e.target.value
    });
    // console.log(this.state.value)
  };
  //конец letter spacing

  render(){

    // стили для select2
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
    // конец стилей для select2


    return <div className="controller-container controller-container_shadow">
      <div className="controller-container__label control-shadow-label">
        {this.props.label}
      </div>
      <div className="control-group control-group-shadow">
          <div className="control-shadow-toggle control-shadow-toggle-active" onClick={this.openTypographic} fill="#8E94AA">
              <ContentIcon id="shadowContentIcon" className="control-shadow-svg-content" fill="#8E94AA" width="16" height="16"/>
          </div>
          <div id="shadowContainer" className="control-shadow-wrapper control-shadow-wrapper-none">
          {/* начало select2 */}
            <div className="controller-container controller-container_select2">
              <div className="control-select2-header">
                <div className="control-select2__label">family</div>
              </div>
            <div className="control-container_select2-wrapper">
              <Select
                onChange={this.changeFamily}
                value={this.state.value.family.label}
                options={this.props.familyOptions}
                styles={customStyles}
                placeholder={this.state.value.family.label}
                noOptionsMessage={() => "no fonts found"}
              />
            </div>
          </div>
          {/* начало slider size */}
          <div className="control-slider-header control-shadow-blur-header">
            <div className="control-slider-label">
              size
            </div>
          </div>
          <div className="control-slider-input-wrapper control-shadow-blur">
            <input type="range"
              min={this.state.sizeMin}
              max={this.state.sizeMax}
              className="control-slider" value={this.state.value.size} onChange={this.inputBlurUpdate} onInput={this.blurChange}/>
            <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                   min={this.state.sizeMin}
                   max={this.state.sizeMax}
                   value={this.state.value.size} onChange={this.inputBlurUpdate} onInput={this.blurChange}/>
            </div>
          </div>
          {/* конец slider size */}
          {/* начало select weight */}
          <div className="controller-container controller-container_select controller-container_select_typographic">
            <div className="controller-container__label control-select__label">
              weight
            </div>
            <div className="control-container_select-wrapper">
              <select name="weightSelect" className="control-select control-field" onChange={this.weightChange}>
                {this.props.weightOptions.map(option => {return <option value={option.value} key={option.value}>{option.label}</option>})}
              </select>
            </div>
          </div>
          {/* конец select weight */}
          {/* начало select transform */}
          <div className="controller-container controller-container_select controller-container_select_typographic">
            <div className="controller-container__label control-select__label">
              transform
            </div>
            <div className="control-container_select-wrapper">
              <select name="weightSelect" className="control-select control-field" onChange={this.transformChange}>
                {this.props.transformOptions.map(option => {return <option value={option.value} key={option.key}>{option.label}</option>})}
              </select>
            </div>
          </div>
          {/* конец select transform */}
          {/* начало select style */}
          <div className="controller-container controller-container_select controller-container_select_typographic">
            <div className="controller-container__label control-select__label">
            style
            </div>
            <div className="control-container_select-wrapper">
              <select name="weightSelect" className="control-select control-field" onChange={this.styleChange}>
                {this.props.styleOptions.map(option => {return <option value={option.value} key={option.key}>{option.label}</option>})}
              </select>
            </div>
          </div>
          {/* конец select style */}
          {/* начало select decoration */}
          <div className="controller-container controller-container_select controller-container_select_typographic">
            <div className="controller-container__label control-select__label">
            decoration
            </div>
            <div className="control-container_select-wrapper">
              <select name="weightSelect" className="control-select control-field" onChange={this.decorationChange}>
                {this.props.decorationOptions.map(option => {return <option value={option.value} key={option.key}>{option.label}</option>})}
              </select>
            </div>
          </div>
          {/* конец select decoration */}
          {/* начало slider Line-Height */}
          <div className="control-slider-header controller-container_slider_typographic_top">
            <div className="control-slider-label">
                line-Height
            </div>
          </div>
          <div className="control-slider-input-wrapper">
            <input type="range"
              min={this.state.lineHeightMin}
              max={this.state.lineHeightMax}
              step="0.1"
              className="control-slider" value={this.state.value.lineHeight} onChange={this.inputHorUpdate} name="horizontal"/>
            <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                   min={this.state.lineHeightMin}
                   max={this.state.lineHeightMax}
                   step="0.1"
                   value={this.state.value.lineHeight} name="horizontalNumber" onChange={this.horChange}/>
            </div>
          </div>
          {/* конец slider line-Height */}
          {/* начало slider Letter Spacing */}
          <div className="control-slider-header">
            <div className="control-slider-label">
                letter Spacing
            </div>
          </div>
          <div className="control-slider-input-wrapper">
            <input type="range"
              min={this.state.spacingMin}
              max={this.state.spacingMax}
              step="0.1"
              className="control-slider" value={this.state.value.spacing} onChange={this.inputVerUpdate} name="spacing"/>
            <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                   min={this.state.spacingMin}
                   max={this.state.spacingMax}
                   step="0.1"
                   value={this.state.value.spacing} name="spacingNumber" onChange={this.verChange}/>
            </div>
          </div>
          {/* конец slider letter Spacing */}
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(TypographicController);
