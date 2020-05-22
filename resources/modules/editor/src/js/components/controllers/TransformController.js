import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg';
import controllerDecorate from "../../decorators/controller";

class TransformController extends Component {
  constructor(props){
    super(props);
    this.changeFunction = this.changeFunction.bind(this);
    this.inputUpdate = this.inputUpdate.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || false;
    this.state = {
      value,
      min: 0,
      max: 0
    };
    controllerDecorate(this);
  }

  changeFunction(e){
    let value = e.target.value;
    let slider = document.getElementById("transformSlider");
    let option = {};

    slider.classList.remove("control-slider-input-wrapper-transform-none");

    switch(value) {
      case "":
        option = {}
        console.log(option)
        slider.classList.add("control-slider-input-wrapper-transform-none")
        break;
      case "rotate":
        option = {
          function: "rotate",
          unit: "deg",
          max: 360,
          min: -360
        }
        break;
      case "scaleX":
        option = {
          function: "scaleX",
          unit: "",
          max: 100,
          min: -100
        }
        break;
      case "scaleY":
        option = {
          function: "scaleY",
          unit: "",
          max: 100,
          min: -100
        }
        break;
      case "skewY":
        option = {
          function: "skewY",
          unit: "deg",
          max: 360,
          min: -360
        }
        break;
      case "skewX":
        option = {
          function: "skewX",
          unit: "deg",
          max: 360,
          min: -360
        }
        break;
      case "translateX":
        option = {
          function: "translateX",
          unit: "%",
          max: 100,
          min: -100
        }
        break;
      case "translateY":
        option = {
          function: "translateY",
          unit: "%",
          max: 100,
          min: -100
        }
        break;
    }

    if(value != "") {
      this.setState({
        max: option.max,
        min: option.min
      })
      this._changeValue({
        ...this.state.value,
        function: option.function,
        size:e.target.value,
        unit: option.unit
      });
    } else {
      this._changeValue({
        ...this.state.value,
        function: "rotate",
        size: 0,
        unit: "deg"
      });
    }
  }

  sliderChange(e) {
    if(this.state.value.function != "scaleX" || "scaleY") {
      this._changeValue({
        ...this.state.value,
        size:e.target.value
      });
    } else {
      this._changeValue({
        ...this.state.value,
        size:e.target.value / 100
      });
    }
    
    // console.log(this.state.value)
  };
  
  inputUpdate (e) {
    this._changeValue({
      ...this.state.value,
      size:e.target.value
    });
  }

  render(){

    return <div className="controller-container controller-container_transform">
      <div className="controller-container__label control-button-label">
        {this.props.label}
      </div>
      <div className="control-group">
        <div className="control-group control-group-transform">
          {/* выбор функции */}
          <div className="control-container_select-wrapper control-container_select-wrapper-transform">
            <select className="control-select control-field" onChange={this.changeFunction}>
              {this.props.options.map(option => {return <option value={option.value} key={option.value}>{option.label}</option>})}
            </select>
          </div>
        </div>
      </div>
      {/* слайдер */}
      <div id="transformSlider" className="control-slider-input-wrapper control-slider-input-wrapper-transform control-slider-input-wrapper-transform-none">
        <input type="range"
                min={this.state.min}
                max={this.state.max}
                className="control-slider" value={this.state.value.size} onChange={this.inputUpdate} onInput={this.sliderChange}/>
          <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                min={this.state.min}
                max={this.state.max}
                value={this.state.value.size} onChange={this.inputUpdate} onInput={this.sliderChange}/>
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
export default connect(mapStateToProps)(TransformController);
