import React, { Component } from "react";
import { connect } from "react-redux";
import DynamicIcon from '../../../svgs/dynamic.svg'
import controllerDecorate from "../../decorators/controller";

class ButtonController extends Component {
  constructor(props) {
    super(props);
    controllerDecorate(this);
    this.changeValue = this.changeValue.bind(this);
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

  changeValue(e) {
    this._changeValue({
      ...this.state.value,
      button: e.currentTarget.dataset.value,
    });
    let noActive = [];
    let buttonList = document.getElementById("buttonList");
    for (let i = 0; i < buttonList.children.length; i++) {
      if (i != e.currentTarget.dataset.key) {
        buttonList.children[i].classList.remove(this.state.value.activeClass);
      }
    }
    e.currentTarget.classList.add(this.state.value.activeClass);
  }

  render() {

    if (this.state.show === false) {
      return '';
    }
    let value = this.getSettings(this.props.controlId) || this.getDefaultValue();

    let buttons = this.props.buttons || [];
    return <div className="controller-container controller-container_button">
      <div className="control-group control-button-container" id="buttonList">
        {buttons.map((buttons) => {
          return <button key={buttons.key} data-value={buttons.value} id={"activeButton" + buttons.key} data-key={buttons.key} onClick={this.changeValue} className={value.button === buttons.value ? value.activeClass : ""} style={buttons.styles}>{buttons.label}</button>
        })
        }
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement,
    currentState: state.currentState,
  };
}
export default connect(mapStateToProps)(ButtonController);
