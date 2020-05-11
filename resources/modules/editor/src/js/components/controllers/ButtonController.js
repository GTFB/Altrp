import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";

class ButtonController extends Component {
  constructor(props){
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
  }

  render(){

    return <div className="controller-container controller-container_button">
      <div className="controller-container__label control-button-label">
        {this.props.label}
      </div>
      <div className="control-group">
        <button className="btn" style={this.props.classes}>{this.state.value.label}</button>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(ButtonController);
