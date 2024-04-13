import { controllerMapStateToProps } from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";

class SwitcherController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.toggle = this.toggle.bind(this);
    let value = this.getSettings(this.props.controlId);

    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || false;
    this.state = {
      value,
      show: true
    };
  }
  toggle() {
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();

    this._changeValue(!value);
  }
  getDefaultValue() {
    return false;
  }

  render() {
    /**
     * ПРоверка this.state.show
     */
    if (this.state.show === false) {
      return '';
    }

    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();

    // if(this.props.controlId === 'query_sync'){
    //   console.log(value)
    // }

    let switcherClasses = `control-switcher control-switcher_${value ? 'on' : 'off'}`;
    return <div className="controller-container controller-container_switcher">
      <div className="controller-container__label">
        {this.props.label}
      </div>
      <div className={switcherClasses} onClick={this.toggle}>
        <div className="control-switcher__on-text">ON</div>
        <div className="control-switcher__caret" />
        <div className="control-switcher__off-text">OFF</div>
      </div>
      {this.props.description && (
        <div className="controller-container__description"
             dangerouslySetInnerHTML={{__html:this.props.description}}
        />
      )}
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
export default connect(controllerMapStateToProps)(SwitcherController);
