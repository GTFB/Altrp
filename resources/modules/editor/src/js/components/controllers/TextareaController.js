import React, {Component} from "react";
import {connect} from "react-redux";
import {settingToState} from "../../helpers";
import DynamicIcon from '../../../svgs/dynamic.svg'

class TextareaController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this);
    let setting = this.props.currentElement.getSettings(this.props.settingName);
    this.state = settingToState(setting)


  }
  changeValue(e){
    this.props.currentElement.setSettingValue(this.props.settingName, e.target.value);
    this.setState({
      value:e.target.value
    })
  }
  render(){

    return <div className="controller-container">
      <div className="controller-container__label">

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
