import React, {Component} from "react";
import {connect} from "react-redux";
import { SketchPicker } from "react-color"
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";

class ColorController extends Component {
  constructor(props){
    super(props);
    this.openColorPicker = this.openColorPicker.bind(this)
    this.colorChange = this.colorChange.bind(this)
    // this.inputHex = this.inputHex.bind(this)
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    console.log(value)
    this.state = {value,
      colorPickedHex: this.props.colorPickedHex, 
      opacity: 1, 
      pickerPosition: "0px", 
      colorRGB: this.props.colorPickedRGB, 
      colorPickedRGB: this.props.colorPickedRGB
    };
    controllerDecorate(this);
  }

  getDefaultValue(){
    return '';
  }

  openColorPicker(){
    let colorPicker = document.getElementById("colorPicker");
    let topPicker = colorPicker.offsetTop;

    colorPicker.classList.toggle("sketchPicker-none");

    this.props.currentElement.setSettingValue(this.props.controlId, topPicker);
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

  // inputHex(e){
  //   let hexToRGB = parseInt(this.state.colorPickedHex.split("#")[1], 16)
  //   let r = (hexToRGB >> 16) & 0xFF;
  //   let g = (hexToRGB >> 8) & 0xFF;
  //   let b = hexToRGB & 0xFF;
  // // let hexToRGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.state.colorPickedHex);
  // // let r = parseInt(hexToRGB[1], 16);
  // // let g = parseInt(hexToRGB[2], 16);
  // // let b = parseInt(hexToRGB[3], 16);
    
  //   console.log(r, g, b)

  //   this.setState({
  //     colorPickedHex: e.target.value,
  //     colorPickedRGB: `rgb(${r}, ${g}, ${b}, ${this.state.opacity})`,
  //   });
  //   console.log(this.state.colorPickedRGB)
  //   this.props.currentElement.setSettingValue(this.props.controlId, e.target.value);
  // };
  
  render(){

    let colorPickedStyle = {
      backgroundColor: this.state.value.color
    };

    let colorPickerPosition = {
      marginTop: this.state.pickerPosition
    };
    return <div className="controller-container controller-container_color">
        <div className="control-color-header">
            <div className="controller-container__label">{this.props.label}</div>
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
          <SketchPicker width="90%" presetColors={this.props.presetColors} color={this.state.colorRGB} onChange={this.colorChange} name="colorPicker" className="sketchPicker" />
        </div>
          {/* sketchPicker-none */}
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(ColorController);
