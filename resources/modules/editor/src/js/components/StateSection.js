
import React, { Component } from "react";
import ('../../sass/state-section.scss');
import { connect } from "react-redux";
import { setCurrentState } from "../store/state-section/actions";
import { getElementState, getCurrentTab } from "../store/store";
import GlobalStylesPresets from "./state-section/GlobalStylesPresets";

class StateSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        { title: "N", value: "" },
        { title: "H", value: ":hover" },
        { title: "A", value: ".active" },
        { title: "F", value: ":focus" },
        { title: "E", value: ".state-error" },
        { title: "D", value: ".state-disabled" },
      ]
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setCurrentState("N", ""));
  }

  setCurrentState(button) {
    this.props.dispatch(setCurrentState(button.title, button.value));
  }

  render() {
    return (
      <div className="state-section-wrapper">
        <div className="state-section">
          {
            this.state.buttons.map((button, index) => {
              return <button
                key={index}
                className={"state-section__button " + (this.props.currentState.title === button.title ? "state-section__button_active" : "")}
                onClick={() => this.setCurrentState(button)}
              >{button.title}</button>
            })
          }
        </div>
        <GlobalStylesPresets/>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    currentState: state.currentState
  }
}

export default connect(mapStateToProps, null)(StateSection);
