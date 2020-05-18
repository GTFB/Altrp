import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";

class ButtonController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this)
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || false;
    this.state = {value};
    controllerDecorate(this);
  }

  changeValue(){
    this._changeValue(!this.state.value);
    // console.log(this.state.value)
  }

  render(){

    return <div className="controller-container controller-container_button">
      <div className="controller-container__label control-button-label">
        {this.props.label}
      </div>
      <div className="control-group">
        {this.props.buttons.map((buttons) => {
          return <button key={buttons.key} data-key={buttons.key} onClick={this.changeValue} style={buttons.styles}>{buttons.label}</button>
        })
      }
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
