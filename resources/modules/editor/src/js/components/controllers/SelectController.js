import React, {Component} from "react";
import {connect} from "react-redux";
import controllerDecorate from "../../decorators/controller";

class SelectController extends Component {
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

    return <div className="controller-container controller-container_select">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className="control-container_select-wrapper">
        <select className="control-select control-field">
          {this.props.select.map(option => {return <option value={option.value}>{option.label}</option>})}
        </select>
      </div>
    </div>
  }
};

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(SelectController);