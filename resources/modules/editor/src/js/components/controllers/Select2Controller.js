import React, {Component} from "react";
import {connect} from "react-redux";
import DesktopIcon from '../../../svgs/desktopNew.svg'
import controllerDecorate from "../../decorators/controller";

class Select2Controller extends Component {
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
  };

  render() {

    return <div className="controller-container controller-container_select2">
      <div className="control-select2-header">
        <div className="control-slider__label-select2">{this.props.label}</div>
        <DesktopIcon className="conntroller-container__label-svg" width="12"/>
      </div>
      <div className="control-container_select2-wrapper">
        test
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(Select2Controller);
