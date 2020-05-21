import React, {Component} from "react";
import {connect} from "react-redux";
import { SketchPicker } from "react-color"
import DynamicIcon from '../../../svgs/dynamic.svg'
import ContentIcon from '../../../svgs/content.svg'
import HistoryIcon from '../../../svgs/history.svg'
import controllerDecorate from "../../decorators/controller";

class ShadowController extends Component {
  constructor(props){
    super(props);
    this.openShadow = this.openShadow.bind(this);
    this.openColorPicker = this.openColorPicker.bind(this);
    this.colorChange = this.colorChange.bind(this);
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
      //color
      colorPickedHex: this.props.colorPickedHex,
      opacity: 1, 
      pickerPosition: "0px", 
      color: this.props.color,
      colorRGB: this.props.colorPickedRGB, 
      colorPickedRGB: this.props.colorPickedRGB,
      //blur
      blur: this.props.blur,
      blurMax: this.props.blurMax || 100,
      blurMin: this.props.blurMin || 0,
      //verHor
      horVerMax: this.props.horVerMax || 100,
      horVerMin: this.props.horVerMin || -100,
    };
    controllerDecorate(this);
  }

  getDefaultValue(){
    return {
      horizontal: "",
      vertical: "",
      blur: "",
    };
  }

  //начало color
  openShadow(){
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

  colorChange(color){
    this.setState({
      colorPickedHex: color.hex,
      colorPickedRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      opacity: color.rgb.a,
      colorRGB: color.rgb
    });
    this._changeValue({
      color: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      colorPickedHex: color.hex
    });

    // console.log(this.state.colorPickedRGB)
  };

  openColorPicker(){
    let colorPicker = document.getElementById("colorPicker");
    let topPicker = colorPicker.offsetTop;

    colorPicker.classList.toggle("sketchPicker-none");

    this.props.currentElement.setSettingValue(this.props.controlId, topPicker);
  }
  //конец color
  //начало blur
  inputBlurUpdate (e) {
    this._changeValue({
      ...this.state.value,
      blur:e.target.value
    });
  }

  blurChange(e) {
    this._changeValue({
      ...this.state.value,
      blur:e.target.value
    });
    // console.log(this.state.value)
  };
  //конец blur
  //начало horizontal displacement
  inputHorUpdate (e) {
    this._changeValue({
      ...this.state.value,
      horizontal:e.target.value
    });
  }

  horChange(e) {
    this._changeValue({
      ...this.state.value,
      horizontal:e.target.value
    });
    // console.log(this.state.value)
  };
  //конец horizontal displacement
  //начало vertical displacement
  inputVerUpdate(e) {
    this._changeValue({
      ...this.state.value,
      vertical:e.target.value
    });
  }

  verChange(e) {
    this._changeValue({
      ...this.state.value,
      vertical:e.target.value
    });
    // console.log(this.state.value)
  };
  //конец vertical displacement

  render(){
    let colorPickedStyle = {
      backgroundColor: this.state.value.color
    };

    let colorPickerPosition = {
      marginTop: this.state.pickerPosition
    };

    return <div className="controller-container controller-container_shadow">
      <div className="controller-container__label control-shadow-label">
        {this.props.label}
      </div>
      <div className="control-group control-group-shadow">
          <div className="control-shadow-toggle control-shadow-toggle-active" onClick={this.openShadow} fill="#8E94AA">
              <ContentIcon id="shadowContentIcon" className="control-shadow-svg-content" fill="#8E94AA" width="16" height="16"/>
          </div>
          <div id="shadowContainer" className="control-shadow-wrapper control-shadow-wrapper-none">
            {/* начало color */}
            <div className="control-color-header">
              <div className="controller-container__label">color</div>
              {/* <div className="controller-newColor"></div> */}
            </div>
            <div className="control-color-wrapper" onClick={this.openColorPicker}>
              <div className="control-color-input">
                <div className="control-color-colorPicked-container">
                  <div className="control-color-colorPicked" style={colorPickedStyle}></div>
                </div>
                <label className="control-color-hex">{this.state.value.colorPickedHex}</label>
              </div>
              <div className="control-color-opacity-container">
                <label className="control-color-opacity" >{(this.state.opacity * 100).toFixed() + "%"}</label>
              </div>
            </div>
            <div id="colorPicker" className=" control-color-colorPicker sketchPicker-none" style={colorPickerPosition}>
            <SketchPicker width="90%" presetColors={this.props.presetColors} color={this.state.colorRGB} onChange={this.colorChange} name="shadowPicker" className="sketchPicker" />
          </div>
          {/* конец color */}
          {/* начало slider blur */}
          <div className="control-slider-header control-shadow-blur-header">
            <div className="control-slider-label">
              blur
            </div>
          </div>
          <div className="control-slider-input-wrapper control-shadow-blur">
            <input type="range"
              min={this.state.blurMin}
              max={this.state.blurMax}
              className="control-slider" value={this.state.value.blur} onChange={this.inputBlurUpdate} onInput={this.blurChange}/>
            <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                   min={this.state.blurMin}
                   max={this.state.blurMax}
                   value={this.state.value.blur} onChange={this.inputBlurUpdate} onInput={this.blurChange}/>
            </div>
          </div>
          {/* конец slider blur */}
          {/* начало slider horizontal displacement */}
          <div className="control-slider-header">
            <div className="control-slider-label">
              horizontal displacement
            </div>
          </div>
          <div className="control-slider-input-wrapper">
            <input type="range"
              min={this.state.horVerMin}
              max={this.state.horVerMax}
              className="control-slider" value={this.state.value.horizontal} onChange={this.inputHorUpdate} onInput={this.horChange}/>
            <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                   min={this.state.horVerMin}
                   max={this.state.horVerMax}
                   value={this.state.value.horizontal} onChange={this.inputHorUpdate} onInput={this.horChange}/>
            </div>
          </div>
          {/* конец slider horizontal displacement */}
          {/* начало slider vertical displacement */}
          <div className="control-slider-header">
            <div className="control-slider-label">
            vertical displacement
            </div>
          </div>
          <div className="control-slider-input-wrapper">
            <input type="range"
              min={this.state.horVerMin}
              max={this.state.horVerMax}
              className="control-slider" value={this.state.value.vertical} onChange={this.inputVerUpdate} onInput={this.verChange}/>
            <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                   min={this.state.horVerMin}
                   max={this.state.horVerMax}
                   value={this.state.value.vertical} onChange={this.inputVerUpdate} onInput={this.verChange}/>
            </div>
          </div>
          {/* конец slider vertical displacement */}
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
export default connect(mapStateToProps)(ShadowController);
