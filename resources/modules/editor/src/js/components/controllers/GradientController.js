import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import ResponsiveDdMenu from "../ResponsiveDdMenu";
import controllerDecorate from "../../decorators/controller";
import { rgb2hex } from "../../helpers"
class GradientController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.state = {
      opened1: false,
      opened2: false
    };
  }

  colorChange = (color, name) => {
    const gradient = this.getSettings(this.props.controlId) || this.props.currentElement.settings.gradient;
    this._changeValue({
      ...gradient,
      [name]: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    });
  };

  setNumber = ({ target: { name, value } }) => {
    const gradient = this.getSettings(this.props.controlId) || this.props.currentElement.settings.gradient;
    this._changeValue({
      ...gradient,
      [name]: value
    });
  }

  toggle = () => {
    const gradient = this.getSettings(this.props.controlId) || this.props.currentElement.settings.gradient;
    this._changeValue({ ...gradient, isWithGradient: !gradient.isWithGradient });
  }

  render() {
    const { isWithGradient, angle, firstColor, firstPoint, secondColor, secondPoint } = 
      this.getSettings(this.props.controlId) || this.props.currentElement.settings.gradient;
    const { opened1, opened2 } = this.state;

    return <>
      <div className="controller-container controller-container_switcher">
        <div className="controller-container__label">
          Gradient Toggle
        </div>
        <div className={`control-switcher control-switcher_${isWithGradient ? 'on' : 'off'}`} onClick={this.toggle}>
          <div className="control-switcher__on-text">ON</div>
          <div className="control-switcher__caret" />
          <div className="control-switcher__off-text">OFF</div>
        </div>
      </div>

      <div className="controller-container">
        <div className="control-color-header">
          <div className="controller-container__label">
            First Color
          <ResponsiveDdMenu className="controller-container__label-svg" width="12" />
          </div>
        </div>
        <div className="control-color-wrapper">
          <div className="control-color-input" onClick={() => this.setState({ opened1: !opened1 })}>
            <div className="control-color-colorPicked-container">
              <div className="control-color-colorPicked" style={{ backgroundColor: firstColor }}></div>
            </div>
            <label className="control-color-hex">{rgb2hex(firstColor)}</label>
          </div>
          {opened1 && <div id="gradientColor" className="control-color-colorPicker">
            <SketchPicker width="90%" color={firstColor} onChange={color => this.colorChange(color, 'firstColor')} className="sketchPicker" />
          </div>}
          <div className="control-color-opacity-container">
            {/* TODO: порефакторить */}
            <label className="control-color-opacity" >{(parseFloat(firstColor.split(',')[3]) * 100).toFixed() + "%"}</label>
          </div>
        </div>
      </div>

      <div className="controller-container">
        <div className="control-color-header">
          <div className="controller-container__label">
            First Stop Point
          <ResponsiveDdMenu className="controller-container__label-svg" width="12" />
          </div>
        </div>

        <div className="control-slider-input-wrapper">
          <input type="range" min={0} max={100} step={1}
            className="control-slider"
            name="firstPoint"
            value={firstPoint}
            onChange={this.setNumber}
          />

          <div className="control-slider-input-box">
            <input type="number" min={0} max={100}
              className="control-slider-input"
              name="firstPoint"
              value={firstPoint}
              onChange={this.setNumber}
            />
          </div>
        </div>
      </div>

      <div className="controller-container">
        <div className="control-color-header">
          <div className="controller-container__label">
            Second Color
          <ResponsiveDdMenu className="controller-container__label-svg" width="12" />
          </div>
        </div>
        <div className="control-color-wrapper">
          <div className="control-color-input" onClick={() => this.setState({ opened2: !opened2 })}>
            <div className="control-color-colorPicked-container">
              <div className="control-color-colorPicked" style={{ backgroundColor: secondColor }}></div>
            </div>
            <label className="control-color-hex">{rgb2hex(secondColor)}</label>
          </div>
          {opened2 && <div id="gradientColor" className="control-color-colorPicker">
            <SketchPicker width="90%" color={secondColor} onChange={color => this.colorChange(color, 'secondColor')} className="sketchPicker" />
          </div>}
          <div className="control-color-opacity-container">
            {/* TODO: порефакторить */}
            <label className="control-color-opacity" >{(parseFloat(secondColor.split(',')[3]) * 100).toFixed() + "%"}</label>
          </div>
        </div>
      </div>

      <div className="controller-container">
        <div className="control-color-header">
          <div className="controller-container__label">
            Second Stop Point
          <ResponsiveDdMenu className="controller-container__label-svg" width="12" />
          </div>
        </div>

        <div className="control-slider-input-wrapper">
          <input type="range" min={0} max={100} step={1}
            className="control-slider"
            name="secondPoint"
            value={secondPoint}
            onChange={this.setNumber}
          />

          <div className="control-slider-input-box">
            <input type="number" min={0} max={100}
              className="control-slider-input"
              name="secondPoint"
              value={secondPoint}
              onChange={this.setNumber}
            />
          </div>
        </div>
      </div>

      <div className="controller-container">
        <div className="control-color-header">
          <div className="controller-container__label">
            Angle
          <ResponsiveDdMenu className="controller-container__label-svg" width="12" />
          </div>
        </div>

        <div className="control-slider-input-wrapper">
          <input type="range" min={0} max={360} step={1}
            className="control-slider"
            name="angle"
            value={angle}
            onChange={this.setNumber}
          />

          <div className="control-slider-input-box">
            <input type="number" min={0} max={360}
              className="control-slider-input"
              name="angle"
              value={angle}
              onChange={this.setNumber}
            />
          </div>
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
