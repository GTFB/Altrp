import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'

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

  }
  componentDidUpdate(){
    this.props.currentElement.setSettingValue(this.props.controlId, this.state.value);
  }
  componentDidMount(){
    // this.props.currentElement.setSettingValue(this.props.controlId, this.state.value);
  }
  changeValue(e){
    this.setState({
      value:e.target.value
    })
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
