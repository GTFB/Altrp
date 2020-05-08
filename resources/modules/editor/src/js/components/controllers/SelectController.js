import React, {Component} from "react";
import {connect} from "react-redux";
import DesktopIcon from '../../../svgs/desktopNew.svg'
import controllerDecorate from "../../decorators/controller";

class SelectController extends Component {
  constructor(props) {
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
    this.changeValue = this.changeValue.bind(this);
  }

  getDefaultValue(){
    return '';
  }
  changeValue(e){
    this._changeValue(e.target.value);
  }

  render() {

    return <div className="controller-container controller-container_select">
      <div className="controller-container__label control-slider__label-select">
        {this.props.label}
        <DesktopIcon className="conntroller-container__label-svg" width="12"/>
      </div>
      <div className="control-container_select-wrapper">
        <select className="control-select control-field" onChange={this.changeValue}>
          {this.props.options.map(option => {return <option value={option.value} key={option.value}>{option.label}</option>})}
        </select>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(SelectController);
