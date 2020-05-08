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
    this.inputHex = this.inputHex.bind(this)
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value, colorPickedHex: this.props.colorPickedHex, opacity: 1, colorPickedRGB: "rgb(39,75,200,1)"};
    controllerDecorate(this);
  }

  openColorPicker(){
    let colorPicker = document.getElementById("colorPicker");
    colorPicker.classList.toggle("sketchPicker-none");
  }
  
  colorChange(color){
    this.setState({
      colorPickedHex: color.hex,
      colorPickedRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      opacity: color.rgb.a
    });
    // console.log(this.state.colorPickedRGB)
    this.props.currentElement.setSettingValue(this.props.controlId, color.hex, color.rgb);
  };

  inputHex(e, color){
    this.setState({
      colorPickedHex: e.target.value,
      colorPickedRGB: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
    })
    this.props.currentElement.setSettingValue(this.props.controlId, e.target.value, color.rgb, color);
  };

  render(){

    let colorPickedStyle = {
      backgroundColor: this.state.colorPickedRGB
    }

    return <div className="controller-container controller-container_color">
        <div id="colorPicker" className=" control-color-colorPicker">
          <SketchPicker color={this.state.colorPickedHex} onChange={this.colorChange} name="colorPicker" className="sketchPicker" />
        </div>
        <div className="control-link-header">
            <div className="controller-container__label">{this.props.label}</div>
            <div className="controller-newColor"></div>
        </div>
        <div className="control-color-wrapper" onClick={this.openColorPicker}>
            <div className="control-color-input">
                <div className="control-color-colorPicked" style={colorPickedStyle}></div>
                <input className="control-color-hex" onChange={this.inputHex} value={this.state.colorPickedHex}></input>
            </div>
            <div className="control-color-opacity-container">
                    <label className="control-color-opacity">{this.state.opacity}</label>
            </div>
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
