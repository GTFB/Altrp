import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";
import { iconsManager } from "../../../../../admin/src/js/helpers";
import ResponsiveDdMenu from "../ResponsiveDdMenu";

class TextController extends Component {
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
      dynamicValue: value.dynamic ? value : null,
      show: true
    };
    this.dynamicButton = React.createRef();
  }

  /**
   * Потеря фокуса обновляет элемент
   * @param e
   */
  onBlur = e =>{
    this._changeValue(e.target.value)
  };
  onKeyDown = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };
  /**
   * Изменение больше не обновляет элемент
   * @param e
   */
  changeValue(e) {
    this._changeValue(e.target.value, false)
  }

  getDefaultValue() {
    return '';
  }

  render() {
    if (this.state.show === false) {
      return '';
    }
    // let value = this.getSettings(this.props.controlId) || this.getDefaultValue(); todo: удалить если будет работать
    let value = this.state.value || this.getDefaultValue();
    // let value = this.getSettings(this.props.controlId);
    return <div className="controller-container controller-container_text">
      <div className="controller-container__label textcontroller-responsive">
        {this.props.label}
        {this.props.responsive === false ? null : <ResponsiveDdMenu />}
      </div>
      <div className="control-group">
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
        </div> : <input className="control-field"
                        onBlur={this.onBlur}
                        name={this.props.controlId}
                        onKeyDown={this.onKeyDown}
                        onChange={this.changeValue}
                        value={value || ''} />
        }

        {this.props.dynamic === false ? null : <div className="control-group__append" ref={this.dynamicButton} onClick={this.openDynamicContent}>
          <DynamicIcon />
        </div>}
      </div>
      {this.props.description ? <div className="controller-container__description">
        {this.props.description}
      </div> : ''}
    </div>

  }
}


export default connect(controllerMapStateToProps)(TextController);
