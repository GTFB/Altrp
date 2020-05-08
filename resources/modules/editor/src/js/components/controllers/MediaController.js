import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import AddIcon from '../../../svgs/add.svg'
import controllerDecorate from "../../decorators/controller";

class MediaController extends Component {
  constructor(props){
    super(props);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || {};
    this.state = {value};
    controllerDecorate(this);
  }
  getDefaultValue(){
    return {};
  }
  render(){

    return <div className="controller-container controller-container_media">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className="controller-media-choose">
        <AddIcon className="icon"/>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(MediaController);
