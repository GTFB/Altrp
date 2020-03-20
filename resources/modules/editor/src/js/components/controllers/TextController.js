import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";

class TextController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    // console.log(value);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {value};
    controllerDecorate(this);
  }
  changeValue(e){
    this.setState({
      value:e.target.value
    });
    this.props.currentElement.setSettingValue(this.props.controlId, e.target.value);
  }
  getDefaultValue(){
    return '';
  }
  render(){

    return <div className="controller-container controller-container_text">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className="control-group">
        <input className="control-field" onChange={this.changeValue} value={this.state.value}/>
        <div className="control-group__append">
          <DynamicIcon/>
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
export default connect(mapStateToProps)(TextController);
