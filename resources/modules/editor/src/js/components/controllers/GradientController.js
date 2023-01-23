import { controllerMapStateToProps } from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import ResponsiveDdMenu from "../ResponsiveDdMenu";
import controllerDecorate from "../../decorators/controller";
import { rgb2hex } from "../../helpers";
// import PresetColors from "./PresetColors";
import GlobalPresetColors from "./GlobalPresetColors";
import { getCurrentElement } from "../../store/store";
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
    let gradient =
      this.getSettings(this.props.controlId) ||
      this.props.currentElement.settings.gradient;
    let _color = _.isString(color) ? color : `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`

    gradient = {
      ...gradient,
      [name]: _color
    };
    const {
      isWithGradient,
      angle,
      firstColor,
      firstPoint,
      secondColor,
      secondPoint
    } = gradient;
    console.log(gradient);
    this._changeValue({
      ...gradient,
      value: isWithGradient
        ? `linear-gradient(${angle}deg, ${firstColor} ${firstPoint}%, ${secondColor} ${secondPoint}%);`
        : ""
    });
    if (color?.guid) {
    }
  };

  setNumber = ({ target: { name, value } }) => {
    let gradient =
      this.getSettings(this.props.controlId) ||
      this.props.currentElement.settings.gradient;
    gradient = { ...gradient, [name]: value };
    const {
      isWithGradient,
      angle,
      firstColor,
      firstPoint,
      secondColor,
      secondPoint
    } = gradient;

    this._changeValue({
      ...gradient,
      value: isWithGradient
        ? `linear-gradient(${angle}deg, ${firstColor} ${firstPoint}%, ${secondColor} ${secondPoint}%);`
        : ""
    });
  };

  toggle = () => {
    let gradient =
      this.getSettings(this.props.controlId) ||
      this.props.currentElement.settings.gradient || {};
    gradient = { ...gradient, isWithGradient: !gradient.isWithGradient };
    const {
      isWithGradient,
      angle,
      firstColor,
      firstPoint,
      secondColor,
      secondPoint
    } = gradient;

    this._changeValue({
      ...gradient,
      value: isWithGradient
        ? `linear-gradient(${angle}deg, ${firstColor} ${firstPoint}%, ${secondColor} ${secondPoint}%);`
        : ""
    });
  };

  getDefaultValue() {
    return {};
  }

  setGlobal(guid, settingName) {
    getCurrentElement().setGlobalStyle(
      guid,
      typeof settingName != "undefined"
        ? `${settingName}:${this.props.controller.getSettingName()}`
        : this.props.controller.getSettingName()
    );
  }

  render() {
    const {
      isWithGradient,
      angle,
      firstColor,
      firstPoint,
      secondColor,
      secondPoint
    } =
      this.getSettings(this.props.controlId) ||
      this.props.currentElement.settings.gradient ||
      {};
    const { opened1, opened2 } = this.state;

    return (
      <>
        <div className="controller-container controller-container_switcher">
          <div className="controller-container__label">Gradient Toggle</div>
          <div
            className={`control-switcher control-switcher_${
              isWithGradient ? "on" : "off"
            }`}
            onClick={this.toggle}
          >
            <div className="control-switcher__on-text">ON</div>
            <div className="control-switcher__caret" />
            <div className="control-switcher__off-text">OFF</div>
          </div>
        </div>

        <div className="controller-container">
          <div className="control-color-header">
            <div className="controller-container__label">
              First Color
              <ResponsiveDdMenu
                className="controller-container__label-svg"
                width="12"
              />
            </div>
          </div>
          <div className="control-color-wrapper">
            <div
              className="control-color-input"
              onClick={() => this.setState({ opened2: !opened2 })}
            >
              <div className="control-color-colorPicked-container">
                <div
                  className="control-color-colorPicked"
                  style={{ backgroundColor: secondColor }}
                />
              </div>
              <label className="control-color-hex">
                {rgb2hex(secondColor)}
              </label>
            </div>
            {opened2 && (
              <div id="gradientColor" className="control-color-colorPicker">
                <SketchPicker
                  width="100%"
                  presetColors={[]}
                  color={secondColor}
                  onChange={color => this.colorChange(color, "secondColor")}
                  className="sketchPicker"
                />
                <GlobalPresetColors
                  presetColors={this.props.globalColors}
                  value={firstColor}
                  changeValue={color => {
                    let value = { ...this.state.value };
                    value.firstColor = color.color;
                    if (color?.guid) {
                      this.setGlobal(color.guid, "gradient-first-color");
                    }
                    if(color.cssVar){
                      this.colorChange(color.cssVar, "secondColor")
                      value.firstColor = color.cssVar
                    }
                    //console.log(value);
                    //this._changeValue(value);
                    this.setState(state => ({ ...state, value }));
                  }}
                />
              </div>
            )}
            <div className="control-color-opacity-container">
              {/* TODO: порефакторить */}
              <label className="control-color-opacity">
                {secondColor &&
                  (parseFloat(secondColor.split(",")[3]) * 100).toFixed() + "%"}
              </label>
            </div>
          </div>
        </div>

        <div className="controller-container">
          <div className="control-color-header">
            <div className="controller-container__label">
              First Stop Point
              <ResponsiveDdMenu
                className="controller-container__label-svg"
                width="12"
              />
            </div>
          </div>

          <div className="control-slider-input-wrapper">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              className="control-slider"
              name="secondPoint"
              value={secondPoint}
              onChange={this.setNumber}
            />

            <div className="control-slider-input-box">
              <input
                type="number"
                min={0}
                max={100}
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
              Second Color
              <ResponsiveDdMenu
                className="controller-container__label-svg"
                width="12"
              />
            </div>
          </div>
          <div className="control-color-wrapper">
            <div
              className="control-color-input"
              onClick={() => this.setState({ opened1: !opened1 })}
            >
              <div className="control-color-colorPicked-container">
                <div
                  className="control-color-colorPicked"
                  style={{ backgroundColor: firstColor }}
                />
              </div>
              <label className="control-color-hex">{rgb2hex(firstColor)}</label>
            </div>
            {opened1 && (
              <div id="gradientColor" className="control-color-colorPicker">
                <SketchPicker
                  width="100%"
                  presetColors={[]}
                  color={firstColor}
                  onChange={color => this.colorChange(color, "firstColor")}
                  className="sketchPicker"
                />
                <GlobalPresetColors
                  presetColors={this.props.globalColors}
                  value={secondColor}
                  changeValue={color => {
                    let value = { ...this.state.value };
                    value.secondColor = color.color;
                    if (color?.guid) {
                      this.setGlobal(color.guid, "gradient-second-color");
                    }
                    if(color.cssVar){
                      this.colorChange(color.cssVar, "firstColor")
                      value.secondColor = color.cssVar;
                    }
                    // this._changeValue(value);
                    // this.setState(state => ({ ...state, value }));
                  }}
                />
              </div>
            )}
            <div className="control-color-opacity-container">
              {/* TODO: порефакторить */}
              <label className="control-color-opacity">
                {firstColor &&
                  (parseFloat(firstColor.split(",")[3]) * 100).toFixed() + "%"}
              </label>
            </div>
          </div>
        </div>

        <div className="controller-container">
          <div className="control-color-header">
            <div className="controller-container__label">
              Second Stop Point
              <ResponsiveDdMenu
                className="controller-container__label-svg"
                width="12"
              />
            </div>
          </div>

          <div className="control-slider-input-wrapper">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              className="control-slider"
              name="firstPoint"
              value={firstPoint}
              onChange={this.setNumber}
            />

            <div className="control-slider-input-box">
              <input
                type="number"
                min={0}
                max={100}
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
              Angle
              <ResponsiveDdMenu
                className="controller-container__label-svg"
                width="12"
              />
            </div>
          </div>

          <div className="control-slider-input-wrapper">
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              className="control-slider"
              name="angle"
              value={angle}
              onChange={this.setNumber}
            />

            <div className="control-slider-input-box">
              <input
                type="number"
                min={0}
                max={360}
                className="control-slider-input"
                name="angle"
                value={angle}
                onChange={this.setNumber}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(controllerMapStateToProps)(GradientController);
