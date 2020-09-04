import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import ResponsiveDdMenu from "../ResponsiveDdMenu";
import controllerDecorate from "../../decorators/controller";

class GradientController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    // let value = this.getSettings(this.props.controlId);
    // if (value === null && this.props.default) {
    //   value = this.props.default;
    // }
    // value = value || '';
    this.state = {
      opened1: false
    };
  }

  colorChange = (color, name) => {
    const { gradient } = this.props.currentElement.settings;
    this._changeValue({
      ...gradient,
      [name]: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      // colorPickedHex: color.hex,
      // opacity: color.rgb.a
    });
  };

  render() {
    let { angle, firstColor, firstPoint, secondColor, secondPoint } = this.props.currentElement.settings.gradient;
    // const firstColor = "black"
    const { opened1 } = this.state;

    // console.log(firstColor.split(',')[3])
    return <>
      <div className="control-color-header">
        <div className="controller-container__label">
          {this.props.label}
          <ResponsiveDdMenu className="controller-container__label-svg" width="12" />
        </div>
      </div>
      <div className="control-color-wrapper">
        <div className="control-color-input" onClick={() => this.setState({ opened1: !opened1 })}>
          <div className="control-color-colorPicked-container">
            <div className="control-color-colorPicked" style={{ backgroundColor: firstColor }}></div>
          </div>
          <label className="control-color-hex">{firstColor}</label>
        </div>
        {opened1 && <div id="gradientColor" className="control-color-colorPicker" /* style={colorPickerPosition} */>
          <SketchPicker width="90%" color={firstColor} onChange={color => this.colorChange(color, 'firstColor')} className="sketchPicker" />
        </div>}
        <div className="control-color-opacity-container">
          {/* TODO: порефакторить */}
          <label className="control-color-opacity" >{(parseFloat(firstColor.split(',')[3]) * 100).toFixed() + "%"}</label> 
        </div>
      </div>

    </>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}
export default connect(mapStateToProps)(GradientController);
