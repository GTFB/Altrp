import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from "../../../svgs/dynamic.svg";
import DesktopIcon from "../../../svgs/desktopNew.svg";
import BindIcon from "../../../svgs/bind.svg";
import controllerDecorate from "../../decorators/controller";

class DimensionsController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.changeBind = this.changeBind.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    const fillBind = null;
    const stylesBind = {
      transition: "0s",
      backgroundColor: "#8E94AA",
      borderColor: "#8E94AA",
    };
    console.log(this.value)
    const bind = this.props.default.bind || true;
    if(bind == false) {
      this.fillBind = "#8E94AA";
      this.stylesBind = {
        backgroundColor: "none"
      };
    }
    value = value || {};
    let units = this.props.units || ['px'];
    value.unit = value.unit || units[0];
    this.state = {
      value,
      fill: this.fillBind || "#FFF", 
      active: true,
      styles: this.stylesBind || {
        transition: "0s",
        backgroundColor: "#8E94AA",
        borderColor: "#8E94AA",
      },
      // active: this.state.value.active,
      units
    };
    controllerDecorate(this);
  }

  changeUnit(e){
    let unit = e.target.dataset.unit;
    this._changeValue({
      ...this.state.value,
      unit
    });
  };

  changeValue(e){

    if(this.state.active == true){
      if( e.target.value <= 9999){
        this._changeValue({
          ...this.state.value,
          left: e.target.value,
          bottom: e.target.value,
          top: e.target.value,
          right: e.target.value
        })
      }
    } else {
      let active = e.currentTarget.dataset.active;

      if(active == "top"){
        this._changeValue({
          top:e.target.value,
          right: this.state.value.right,
          bottom: this.state.value.bottom,
          left: this.state.value.left,
          unit: this.state.value.unit
        });
      }

      if(active == "right"){
        this._changeValue({
          right:e.target.value,
          bottom: this.state.value.bottom,
          left: this.state.value.left,
          top: this.state.value.top,
          unit: this.state.value.unit
        });
      }

      if(active == "bottom"){
        this._changeValue({
          bottom:e.target.value,
          right: this.state.value.right,
          left: this.state.value.left,
          top: this.state.value.top,
          unit: this.state.value.unit
        });
      }

      if(active == "left"){
        this._changeValue({
          left:e.target.value,
          right: this.state.value.right,
          bottom: this.state.value.bottom,
          top: this.state.value.top,
          unit: this.state.value.unit
        });
      }
    }
    // console.log(this.state.value)

    // this.setState({
    //   value:e.target.value
    // });
    // this.props.currentElement.setSettingValue(this.props.controlId, e.target.value);

  }
  
  changeBind(e){
    let bind = document.getElementById("bind");

    if(this.state.fill == "#FFF") {
      this.setState({
        fill: "#8E94AA",
        active: false,
        styles: null
      })
    } else {
      this.setState({
        fill: "#FFF",
        active: true,
        styles: {
          transition: "0s",
          backgroundColor: "#8E94AA",
          borderColor: "#8E94AA",
        }
      })
    };
    this._changeValue({
      bind: !this.state.value.bind
    })
  }

  getDefaultValue(){
    return {
      left: '',
      top: '',
      bottom: '',
      right: '',
      unit: 'px',
    };
  }
  render(){
    let styleBind = this.state.styles
    return <div className="controller-container controller-container_dimensions">
      <div className="control-dimensions-header">
        <div className="controller-dimensions__label">{this.props.label}</div>
        <DesktopIcon className="controller-container__label-svg" width="12"/>

        <div className="control-slider-type">
          {
            this.state.units.map(unit=>{
              let classes = 'control-slider-type-box';
              if(this.state.value.unit === unit){
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
      <div className="control-group">
        <div className="control-dimensions-container">
          <input className="control-field control-field-dimensions control-field-top-l"
                 onChange={this.changeValue}
                 data-active="top"
                 value={this.state.value.top || ''}
                 type="number"/>
          <label className="control-field-top-l-label control-field-dimensions-label">TOP</label>
        </div>
        <div className="control-dimensions-container">
          <input className="control-field control-field-dimensions control-field-top-r"
                 onChange={this.changeValue}
                 data-active="right"
                 value={this.state.value.right || ''}
                 type="number"/>
          <label className="control-field-top-r-label control-field-dimensions-label">RIGHT</label>
        </div>
        <div className="control-dimensions-container">
          <input className="control-field control-field-dimensions control-field-bot-l"
                 onChange={this.changeValue}
                 data-active="bottom"
                 value={this.state.value.bottom || ''}
                 type="number"/>
          <label className="control-field-bot-l-label control-field-dimensions-label">BOTTOM</label>
        </div>
        <div className="control-dimensions-container">
          <input className="control-field control-field-dimensions control-field-bot-r"
                 onChange={this.changeValue}
                 data-active="left"
                 value={this.state.value.left || ''}
                 type="number"/>
          <label className="control-field-bot-r-label control-field-dimensions-label">LEFT</label>
        </div>
        <div id="bind" className="control-field control-field-bind" style={styleBind} onClick={this.changeBind}>
          <BindIcon width="12" height="12" fill={this.state.fill}/>
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
export default connect(mapStateToProps)(DimensionsController);
