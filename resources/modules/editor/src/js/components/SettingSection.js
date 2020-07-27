import React, { Component } from "react";
import ChevronIcon from '../../svgs/chevron.svg'
import { connect } from "react-redux";
import { getCurrentElement, getCurrentTab, getElementState } from "../store/store";
import { setActiveSection } from "../store/setting-section/actions";

class SettingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggle = this.toggle.bind(this);
    this.sectionToggle = this.sectionToggle.bind(this);
  };

  componentDidMount() {
  }

  toggle() {
    this.props.dispatch(setActiveSection(getCurrentElement().getName(), getCurrentTab(), this.props.sectionID));
  };

  sectionToggle() {
    this.setState({
      open: !this.state.open,
    })
  };

  render() {
    let currentElementName = getCurrentElement().getName();
    let currentTab = getCurrentTab();
    let activeSectionID = 0;
    if (this.props.settingSection[currentElementName] && this.props.settingSection[currentElementName][currentTab]) {
      activeSectionID = this.props.settingSection[currentElementName][currentTab];
    }
    let controllers = this.props.controls || [];
    return (
      <div onClick={this.toggle} className={"settings-section " + (this.props.sectionID === activeSectionID && this.state.open && 'open')}>
        <div className="settings-section__title d-flex" onClick={this.sectionToggle}>
          <div className="settings-section__icon d-flex ">
            <ChevronIcon />
          </div>
          <div className="settings-section__label">
            {this.props.label}
          </div>
        </div>
        <div className="controllers-wrapper">
          {
            controllers.map((controller) => {
              let ControllerComponent = window.controllersManager.getController(controller.type);
              return React.createElement(ControllerComponent, { ...controller, key: controller.controlId });
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settingSection: state.settingSectionMenu
  }
}


export default connect(mapStateToProps, null)(SettingSection);
