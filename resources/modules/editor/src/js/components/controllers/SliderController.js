import React, {Component} from "react";
import {connect} from "react-redux";
import DesktopIcon from '../../../svgs/desktopNew.svg'
import controllerDecorate from "../../decorators/controller";

class SliderController extends Component {
  constructor(props) {
    super(props);
    this.inputUpdate = this.inputUpdate.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    // this.onDragSlider = this.onDragSlider.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
  };
  sliderChange(e) {
    this._changeValue(e.target.value);
    // console.log(this.state.value)
  };
  inputUpdate (e) {
    this._changeValue(e.target.value);
  }
  render() {
    console.log(this.state.value);
    return <div className="controller-container controller-container_slider">
      <div className="control-slider-header">
        <div className="control-slider-label">
          {this.props.label}
        </div>
        <DesktopIcon className="conntroller-container__label-svg" width="12"/>

        <div className="control-slider-type">
          <div className="control-slider-type-box">
            <p className="control-slider-type-label">PX</p>  
          </div>
          <div className="control-slider-type-box">
            <p className="control-slider-type-label">%</p>  
          </div>
          <div className="control-slider-type-box">
            <p className="control-slider-type-label">EM</p>  
          </div>
          <div className="control-slider-type-box">
            <p className="control-slider-type-label">VW</p>  
          </div>
        </div>
      </div>
        <div className="control-slider-input-wrapper">
          <input type="range" min="0" max="100" className="control-slider" value={this.state.value} onChange={this.inputUpdate} onInput={this.sliderChange}></input>
          <div className="control-slider-input-box">
            <input className="control-slider-input" type="number" min="0" max="100" value={this.state.value} onChange={this.inputUpdate} onInput={this.sliderChange}></input>
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
export default connect(mapStateToProps)(SliderController);