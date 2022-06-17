import {controllerMapStateToProps} from "../../decorators/controller";
import React, {Component} from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";
import ResponsiveDdMenu from "../ResponsiveDdMenu";

class SliderController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.inputUpdate = this.inputUpdate.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
    let value = this.getSettings(this.props.controlId);

    if (value === null && this.props.default) {
      value = this.props.default;
    }
    this.step = this.props.step || 1;
    value = value || {};
    this.state = {
      value,
      show: true,
      units: this.props.units || ['px'],
      max: this.props.max || 100,
      min: this.props.min || 0,
      step: this.props.step || 1
    };
  }

  changeUnit(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    let unit = e.target.dataset.unit;
    this._changeValue({
      ...value,
      unit
    });
  }
  sliderChange(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      size: e.target.value
    });
    // console.log(this.state.value)
  };

  getDefaultValue() {
    let unit = 'px'
    if(this.props?.units?.length){
      unit = this.props.units[0]
    }
    return {
      size: Number.isFinite(this.props.defaultSize) ? this.props.defaultSize : '',
      unit: 'px',
    };
  }
  inputUpdate(e) {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    this._changeValue({
      ...value,
      size: e.target.value
    });
    // console.log(e.target.value)
  }

  render() {
    if (this.state.show === false) {
      return '';
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    return <div className="controller-container controller-container_slider">
      <div className="control-slider-header">
        <div className="control-slider-label">
          {this.props.label}
        </div>
        <ResponsiveDdMenu />
        <div className="control-slider-type">
          {
            this.state.units.map(unit => {
              let classes = 'control-slider-type-box';
              if (value.unit === unit) {
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
          className="control-slider" value={value.size || 0} onChange={this.inputUpdate}
          onInput={this.sliderChange} />
        <div className="control-slider-input-box">
          <input className="control-slider-input" type="number"
            min={this.state.min}
            max={this.state.max}

            value={value.size || 0} onChange={this.inputUpdate} onInput={this.sliderChange} />
        </div>
      </div>
    </div>
  }
}

export default connect(controllerMapStateToProps)(SliderController);
