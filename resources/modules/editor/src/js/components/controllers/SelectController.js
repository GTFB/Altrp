import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";
import Resource from '../../classes/Resource';
import ResponsiveDdMenu from "../ResponsiveDdMenu";

class SelectController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    /**
     * Нужно ли добавлять выпадашку с брейкпоинтами
     * По умолчанию, показываем
     */
    const responsive = _.get(props, 'responsive', true);
    value = value || '';
    let options;
    if(_.isFunction(this.props.options)){
      options = this.props.options()
    } else {
      options = _.cloneDeep(this.props.options) || [];
    }
    if (props.nullable) {
      options.unshift({ label: '', value: '', })
    }
    this.state = {
      value,
      show: true,
      responsive,
      options
    };
    this.changeValue = this.changeValue.bind(this);
    if (this.props.resource) {
      this.resource = new Resource({ route: this.props.resource });
    }
  }

  getDefaultValue() {
    return '';
  }
  changeValue(e) {
    this._changeValue(e.target.value);
  }

  render() {

    if (this.state.show === false) {
      return '';
    }

    let options = this.state.options
    if(_.isFunction(this.props.options)) {
      options = this.props.options()
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    return <div className="controller-container controller-container_select">
      <div className="controller-container__label control-select__label">
        {this.props.label}
        {this.state.responsive && <ResponsiveDdMenu />}
      </div>
      <div className="control-container_select-wrapper">

        <select className="control-select control-field" value={value || ''} onChange={this.changeValue}>
          {options.map(option => {
            return <option value={option.value} key={option.value}>{option.label}</option> })}
        </select>
      </div>
    </div>
  }
}

export default connect(controllerMapStateToProps)(SelectController);
