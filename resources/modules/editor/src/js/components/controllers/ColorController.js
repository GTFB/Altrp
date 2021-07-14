import { controllerMapStateToProps } from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import controllerDecorate from "../../decorators/controller";
import ResponsiveDdMenu from "../ResponsiveDdMenu";
import GlobalPresetColors from "./GlobalPresetColors";

class ColorController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.openColorPicker = this.openColorPicker.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.closeColorPicker = this.closeColorPicker.bind(this);
    // this.inputHex = this.inputHex.bind(this)
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || "";
    this.state = {
      value,
      show: true,
      colorPickedHex: this.props.colorPickedHex,
      opacity: 1,
      colorRGB: this.props.colorPickedRGB,
      colorPickedRGB: this.props.colorPickedRGB,
      active: false
    };
    this.contentRef = React.createRef();
  }

  getDefaultValue() {
    return "";
  }

  openColorPicker(e) {
    this.setState({
      active: true
    });
    e.stopPropagation();
    document.addEventListener("click", this.closeColorPicker);
  }

  closeColorPicker(e) {
    if (!e.path.includes(this.contentRef.current)) {
      this.setState({ active: false });
      document.removeEventListener("click", this.closeColorPicker);
    }
  }

  setGlobal(guid) {
    getCurrentElement().setGlobalStyle(
      guid,
      this.props.controller.getSettingName()
    );
  }

  /**
   *
   * @param {{}}nextProps
   * @param {{}}nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.colorPickedHex !== nextState.colorPickedHex ||
      nextState.active !== this.state.active ||
      nextState.show !== this.state.show ||
      nextProps.currentState !== this.props.currentState
    ) {
      return true;
    } else {
      return false;
    }
  }

  colorChange(color) {
    this.setState({
      colorPickedHex: color.hex,
      colorPickedRGB: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      opacity: color.rgb.a,
      colorRGB: color.rgb
    });
    this._changeValue({
      color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      colorPickedHex: color.hex,
      colorRGB: color.rgb
    });
  }

  colorChangeFromPreset(color) {
    this.setState({
      colorPickedHex: color.colorPickedHex,
      colorPickedRGB: `rgba(${color.colorRGB.r}, ${color.colorRGB.g}, ${color.colorRGB.b}, ${color.colorRGB.a})`,
      opacity: color.colorRGB.a,
      colorRGB: color.colorRGB
    });
    this._changeValue({
      color: `rgba(${color.colorRGB.r}, ${color.colorRGB.g}, ${color.colorRGB.b}, ${color.colorRGB.a})`,
      colorPickedHex: color.colorPickedHex,
      colorRGB: color.colorRGB
    });
    if (color?.guid) {
      this.setGlobal(color.guid);
    }
  }

  // inputHex(e){
  //   let hexToRGB = parseInt(this.state.colorPickedHex.split("#")[1], 16)
  //   let r = (hexToRGB >> 16) & 0xFF;
  //   let g = (hexToRGB >> 8) & 0xFF;
  //   let b = hexToRGB & 0xFF;
  // // let hexToRGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.state.colorPickedHex);
  // // let r = parseInt(hexToRGB[1], 16);
  // // let g = parseInt(hexToRGB[2], 16);
  // // let b = parseInt(hexToRGB[3], 16);


  //   this.setState({
  //     colorPickedHex: e.target.value,
  //     colorPickedRGB: `rgb(${r}, ${g}, ${b}, ${this.state.opacity})`,
  //   });
  //   this.props.currentElement.setSettingValue(this.props.controlId, e.target.value);
  // };
  render() {
    if (this.state.show === false) {
      return "";
    }
    let value =
      this.getSettings(this.props.controlId) || this.getDefaultValue();
    let colorPickedStyle = {
      backgroundColor: value.color
    };

    let colorPickerPosition = {
      marginTop: this.state.pickerPosition
    };

    return (
      <div className="controller-container controller-container_color">
        <div className="control-color-header">
          <div className="controller-container__label">
            {this.props.label || ""}
            <ResponsiveDdMenu
              className="controller-container__label-svg"
              width="12"
            />
          </div>
          {/* <div className="controller-newColor"></div> */}
        </div>
        <div className="control-color-wrapper" onClick={this.openColorPicker}>
          <div className="control-color-input">
            <div className="control-color-colorPicked-container">
              <div
                className="control-color-colorPicked"
                style={colorPickedStyle}
              />
            </div>
            <label className="control-color-hex">{value.colorPickedHex}</label>
          </div>
          <div className="control-color-opacity-container">
            <label className="control-color-opacity">
              {(this.state.opacity * 100).toFixed() + "%"}
            </label>
          </div>
        </div>
        <div
          ref={this.contentRef}
          className={
            "control-color-colorPicker" +
            (!this.state.active ? " control-color-hide" : "")
          }
          style={colorPickerPosition}
        >
          < SketchPicker
            presetColors={[]}
            color={this.state.colorRGB}
            onChange={this.colorChange}
            style={{
              padding: 0,
              boxShadow: "none"
            }}
            name="colorPicker"
            className="sketchPicker"
          />
          {/* <PresetColors
            presetColors={this.props.presetColors}
            value={this.state.value}
            changeValue={color => {
              this.colorChangeFromPreset(color);
              // this._changeValue(color);
              // this.setState(state=>({...state, colorRGB: color.colorRGB}))
            }}
          /> */}
          <GlobalPresetColors
            presetColors={this.props.globalColors}
            value={this.state.value}
            changeValue={color => {
              this.colorChangeFromPreset(color);
              // this._changeValue(color);
              // this.setState(state=>({...state, colorRGB: color.colorRGB}))
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(controllerMapStateToProps)(ColorController);
