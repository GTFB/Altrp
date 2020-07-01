import React, {Component} from "react";
import {connect} from "react-redux";
import DesktopIcon from '../../../svgs/desktopNew.svg'
import controllerDecorate from "../../decorators/controller";

class SliderController extends Component {
  constructor(props) {
    super(props);
    this.inputUpdate = this.inputUpdate.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    this.step = this.props.step || 1;
    value = value || {};
    this.state = {
      value,
      units: this.props.units || ['px'],
      max: this.props.max || 100,
      min: this.props.min || 0,
      step: this.props.step || 1
    };
    controllerDecorate(this);
  }
  changeUnit(e){
    let unit = e.target.dataset.unit;
    this._changeValue({
      ...this.state.value,
      unit
    });
  }
  sliderChange(e) {
    this._changeValue({
      ...this.state.value,
      size:e.target.value
    });
    // console.log(this.state.value)
  };

  getDefaultValue(){
    return {
      size:'',
      unit: 'px',
    };
  }
  inputUpdate (e) {
    this._changeValue({
      ...this.state.value,
      size:e.target.value
    });
    // console.log(e.target.value)
  }
  render() {
    if(this.state.show === false) {
      return '';
    } else {
      return <div className="controller-container controller-container_slider">
        <div className="control-slider-header">
          <div className="control-slider-label">
            {this.props.label}
          </div>
          <DesktopIcon className="controller-container__label-svg" width="12"/>

          <div className="control-slider-type">
            {
              this.state.units.map(unit => {
                let classes = 'control-slider-type-box';
                if (this.state.value.unit === unit) {
                  classes += ' control-slider-type-box_active';
                }
                return <div className={classes}
                            key={unit}>
                  <button onClick={this.changeUnit}
                          data-unit={unit}
                          className="control-slider-type-label">{unit}</button>
                </div>
              })
            }
          </div>
        </div>
        <div className="control-slider-input-wrapper">
          <input type="range"
                 min={this.state.min}
                 max={this.state.max}

                 step={this.state.step}
                 className="control-slider" value={this.state.value.size || ''} onChange={this.inputUpdate}
                 onInput={this.sliderChange}/>
          <div className="control-slider-input-box">
            <input className="control-slider-input" type="number"
                   min={this.state.min}
                   max={this.state.max}
                   value={this.state.value.size || ''} onChange={this.inputUpdate} onInput={this.sliderChange}/>
          </div>
        </div>
      </div>
    }
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(SliderController);
