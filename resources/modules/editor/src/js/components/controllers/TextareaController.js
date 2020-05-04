import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from '../../decorators/controller'

class TextareaController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
  }
  changeValue(e){
    this._changeValue(e.target.value);
  }
  getDefaultValue(){
    return '';
  }
  render(){

    return <div className="controller-container controller-container_textarea">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className="controller-container__dynamic">
        Dynamic
        <DynamicIcon/>
      </div>
      <textarea className="controller-container__textarea" onChange={this.changeValue} value={this.state.value}/>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(TextareaController);
