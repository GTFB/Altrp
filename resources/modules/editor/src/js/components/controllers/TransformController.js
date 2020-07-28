import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg';
import controllerDecorate from "../../decorators/controller";

class TransformController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.changeFunction = this.changeFunction.bind(this);
    this.inputUpdate = this.inputUpdate.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || false;
    this.state = {
      value,
      show: true,
      min: 0,
      max: 0
    };
  }

  getDefaultValue() {
    return {
    };
  }

  changeFunction(e) {
    let value = e.target.value;
    let slider = document.getElementById("transformSlider");
    let option = {};

    slider.classList.remove("control-slider-input-wrapper-transform-none");

    switch (value) {
      case "":
        option = {}
        slider.classList.add("control-slider-input-wrapper-transform-none")
        break;
      case "rotate":
        option = {
          function: "rotate",
          unit: "deg",
          max: 360,
          min: -360,
          step: 1
        }
        break;
      case "scaleX":
        option = {
          function: "scaleX",
          unit: "",
          max: 100,
          min: -100,
          step: 0.1
        }
        break;
      case "scaleY":
        option = {
          function: "scaleY",
          unit: "",
          max: 100,
          min: -100,
          step: 0.1
        }
        break;
      case "skewY":
        option = {
          function: "skewY",
          unit: "deg",
          max: 360,
          min: -360,
          step: 1
        }
        break;
      case "skewX":
        option = {
          function: "skewX",
          unit: "deg",
          max: 360,
          min: -360,
          step: 1
        }
        break;
      case "translateX":
        option = {
          function: "translateX",
          unit: "%",
          max: 100,
          min: -100,
          step: 1
        }
        break;
      case "translateY":
        option = {
          function: "translateY",
          unit: "%",
          max: 100,
          min: -100,
          step: 1
        }
        break;
    }

    if (value != "") {
      let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
      this.setState({
        max: option.max,
        min: option.min
      })
      this._changeValue({
        ...value,
        function: option.function,
        size: e.target.value,
        unit: option.unit,
        step: option.step
      });
    } else {
      this._changeValue({
        ...value,
        function: "rotate",
        size: 0,
        unit: "deg",
        step: 1
      });
    }
  }

  sliderChange(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    // console.log(this.state.value)
    if (value.function != "scaleX" || "scaleY") {
      this._changeValue({
        ...value,
        size: e.target.value * 0.1
      });
    } else {
      this._changeValue({
        ...value,
        size: e.target.value * 0
      });
    }

    // console.log(this.state.value)
  };

  inputUpdate(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      size: e.target.value
    });
  }

  render() {

    if (this.state.show === false) {
      return '';
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let options = [
      {
        value: "",
        label: "none"
      },
      {
        value: "rotate",
        label: "rotate"
      },
      {
        value: "scaleX",
        label: "scaleX"
      },
      {
        value: "scaleY",
        label: "scaleY"
      },
      {
        value: "skewY",
        label: "skewY"
      },
      {
        value: "skewX",
        label: "skewX"
      },
      {
        value: "translateX",
        label: "translateX"
      },
      {
        value: "translateY",
        label: "translateY"
      }
    ];

    return <div className="controller-container controller-container_transform">
      <div className="controller-container__label control-button-label">
        {this.props.label}
      </div>
      <div className="control-group">
        <div className="control-group control-group-transform">
          {/* выбор функции */}
          <div className="control-container_select_container">
            <div className="control-container_select-wrapper control-container_select-wrapper-transform">
              <select className="control-select control-field" onChange={this.changeFunction}>
                {options.map(option => { return <option value={option.value} key={option.value}>{option.label}</option> })}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* слайдер */}
      <div id="transformSlider" className="control-slider-input-wrapper control-slider-input-wrapper-transform control-slider-input-wrapper-transform-none">
        <input type="range"
          min={this.state.min}
          max={this.state.max}
          step={value.step || 1}
          className="control-slider" value={value.size || ""} onChange={this.inputUpdate} onInput={this.sliderChange} />
        <div className="control-slider-input-box">
          <input className="control-slider-input" type="number"
            min={this.state.min}
            max={this.state.max}
            step={value.step || 1}
            value={value.size || ""} onChange={this.inputUpdate} onInput={this.sliderChange} />
        </div>
      </div>
    </div>

  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
  };
}
export default connect(mapStateToProps)(TransformController);
