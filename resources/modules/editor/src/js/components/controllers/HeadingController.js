import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";

class HeadingController extends Component {
  constructor(props){
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {
      value,
      show: true
    };
    controllerDecorate(this);
  }

  render(){

    if(this.state.show === false) {
      return '';
    }
      return <div className="controller-container controller-container_heading">
        <h1 className="control-heading">{this.state.value.label}</h1>
      </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(HeadingController);
