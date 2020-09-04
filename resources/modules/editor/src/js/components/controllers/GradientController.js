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
      opened: false
    };
  }

  colorChange = (color) => {
    this._changeValue({
      color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      colorPickedHex: color.hex,
      opacity: color.rgb.a
    });
  };

  render() {
    let { angle, firstColor, firstPoint, secondColor, secondPoint } = this.props.currentElement.gradient;

    const { opened } = this.state;

    console.log(opened)
    return <>
      <div className="control-color-header">
        <div className="controller-container__label">
          {this.props.label}
          <ResponsiveDdMenu className="controller-container__label-svg" width="12" />
        </div>
      </div>
      <div className="control-color-wrapper">
        <div className="control-color-input" onClick={() => this.setState({ opened: !opened })}>
          <div className="control-color-colorPicked-container">
            <div className="control-color-colorPicked" style={{ backgroundColor: color }}></div>
          </div>
          {/* <label className="control-color-hex">{colorPickedHex}</label> */}
        </div>
        {opened && <div id="gradientColor" className="control-color-colorPicker" /* style={colorPickerPosition} */>
          <SketchPicker width="90%" color={firstColor} onChange={this.colorChange} name="colorPicker" className="sketchPicker" />
        </div>}
        {/* <div className="control-color-opacity-container">
          <label className="control-color-opacity" >{(this.state.opacity * 100).toFixed() + "%"}</label>
        </div> */}
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
