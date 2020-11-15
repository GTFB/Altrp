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
    const options = _.cloneDeep(this.props.options) || [];
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

    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();
    return <div className="controller-container controller-container_select">
      <div className="controller-container__label control-select__label">
        {this.props.label}
        {this.state.responsive && <ResponsiveDdMenu />}
      </div>
      <div className="control-container_select-wrapper">

        <select className="control-select control-field" value={value || ''} onChange={this.changeValue}>
          {this.state.options.map(option => { return <option value={option.value} key={option.value || 'null'}>{option.label}</option> })}
        </select>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
    currentScreen: state.currentScreen
  };
}
export default connect(controllerMapStateToProps)(SelectController);
