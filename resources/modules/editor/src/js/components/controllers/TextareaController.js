import React, {Component} from "react";
import {connect} from "react-redux";
import {settingToState} from "../../helpers";
import DynamicIcon from '../../../svgs/dynamic.svg'

class TextareaController extends Component {
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

  }
  componentDidUpdate(){
    this.props.currentElement.setSettingValue(this.props.controlId, this.state.value);
  }
  componentDidMount(){
    this.props.currentElement.setSettingValue(this.props.controlId, this.state.value);
  }
  changeValue(e){
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
