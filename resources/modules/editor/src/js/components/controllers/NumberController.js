import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";
import ResponsiveDdMenu from "../ResponsiveDdMenu";

class NumberController extends Component {
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
      show: true
    };
  }
  /**
   * Потеря фокуса обновляет элемент
   * @param e
   */
  onBlur = e =>{
    this._changeValue(Number(e.target.value))
  };

  onKeyDown = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  /**
   * Изменение больше не обновляет элемент
   * @param e
   */
  changeValue(e) {
    this._changeValue(Number(e.target.value), false);
  }
  getDefaultValue() {
    return '';
  }
  render() {
    if (this.state.show === false) {
      return '';
    }
    const {
      fullLength = false,
      responsive = true,
    } = this.props
    // let value = this.getSettings(this.props.controlId) || this.getDefaultValue(); todo: удалить если будет работать
    let value = this.state.value || this.getDefaultValue();
    return <div className="controller-container controller-container_number">
      <div className="controller-container__label">
        {this.props.label}
        {responsive && <ResponsiveDdMenu />}
      </div>
      <div className={`control-group ${fullLength ? 'control-group_full-length' : ''}`}>
        <input className="control-field"
               onKeyDown={this.onKeyDown}
               onBlur={this.onBlur}
               onChange={this.changeValue} value={value} type="number" />
      </div>
    </div>
  }
}

export default connect(controllerMapStateToProps)(NumberController);
