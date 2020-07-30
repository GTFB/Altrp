import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from '../../decorators/controller'
import { iconsManager } from "../../../../../admin/src/js/helpers";

class TextareaController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.changeValue = this.changeValue.bind(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || '';
    this.state = {
      value,
      show: true,
      dynamicValue: value.dynamic ? value : null,
    };
    this.dynamicButton = React.createRef();
  }
  changeValue(e) {
    this._changeValue(e.target.value);
  }
  getDefaultValue() {
    return '';
  }
  render() {
    if (this.state.show === false) {
      return '';
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    return <div className="controller-container controller-container_textarea">
      <div className="controller-container__label">
        {this.props.label}
      </div>

      {
        this.state.dynamicValue ? '' : <div className="controller-container__dynamic" ref={this.dynamicButton} onClick={this.openDynamicContent}>
          Dynamic
            <DynamicIcon />
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
      </div> : <textarea className="controller-container__textarea" onChange={this.changeValue} value={value} />
      }
      {this.props.description ? <div className="controller-container__description">
        {this.props.description}
      </div> : ''}
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
  };
}
export default connect(mapStateToProps)(TextareaController);
