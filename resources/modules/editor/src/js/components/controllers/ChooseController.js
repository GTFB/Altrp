import {controllerMapStateToProps} from "../../decorators/controller";
import React, { Component } from "react";
import { connect } from "react-redux";
import controllerDecorate from "../../decorators/controller";
import { iconsManager } from "../../helpers";
import ResponsiveDdMenu from "../ResponsiveDdMenu";

class ChooseController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.change = this.change.bind(this);
    let value = this.getSettings(this.props.controlId);
    if (value === null && this.props.default) {
      value = this.props.default;
    }
    value = value || '';
    this.state = {
      value,
      show: true
    };
  };

  getDefaultValue() {
    return '';
  }

  change(e) {
    let choose = e.currentTarget.dataset.change;
    this._changeValue(choose);
  };

  render() {
    if (this.state.show === false) {
      return '';
    }

    return <div className="controller-container controller-container_choose">
      <div className="controller-container__label">
        {this.props.label}
        <ResponsiveDdMenu />
      </div>
      <div className="control-container-choose">
        {
          this.props.options.map(option => {
            let Icon = iconsManager().getIconComponent(option.icon);
            const active = option.value == this.state.value;
            return <div className={`control-container-choose-block ${active ? 'control-container-choose-block-active' : ''}`}
              key={option.value}
              data-change={option.value} onClick={this.change}>
              <Icon fill={active ? '#FFF' : '#8E94AA'} />
            </div>
          }
          )
        }
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
export default connect(controllerMapStateToProps)(ChooseController);
