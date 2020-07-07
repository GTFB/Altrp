import React, {Component} from "react";
import {connect} from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from '../../decorators/controller'
import {iconsManager} from "../../../../../admin/src/js/helpers";

class TextareaController extends Component {
  constructor(props){
    super(props);
    this.changeValue = this.changeValue.bind(this);
    let value = this.props.currentElement.getSettings(this.props.controlId);
    if(value === null && this.props.default){
      value = this.props.default ;
    }
    value = value || '';
    this.state = {
      value,
      show: true,
      dynamicValue: value.dynamic ? value : null,
    };
    this.dynamicButton = React.createRef();
    controllerDecorate(this);
  }
  changeValue(e){
    this._changeValue(e.target.value);
  }
  getDefaultValue(){
    return '';
  }
  render(){

    if(this.state.show === false) {
      return '';
    }
      return <div className="controller-container controller-container_textarea">
        <div className="controller-container__label">
          {this.props.label}
        </div>
        {
          this.state.dynamicValue ? '' : <div className="controller-container__dynamic"  ref={this.dynamicButton} onClick={this.openDynamicContent}>
            Dynamic
            <DynamicIcon/>
          </div>
        }
        {this.state.dynamicValue ? <div className="dynamic-placeholder control-field">
          <div className="dynamic-placeholder__text">
            {
              `${this.state.dynamicValue.modelTitle} ${this.state.dynamicValue.fieldTitle}`
            }
          </div>

          <div className="dynamic-placeholder__remove" onClick={this.removeDynamicSettings}>
            {
              iconsManager().renderIcon('times')
            }
          </div>
        </div> : <textarea className="controller-container__textarea" onChange={this.changeValue} value={this.state.value}/>
        }

      </div>
  }
}

function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement,
  };
}
export default connect(mapStateToProps)(TextareaController);
