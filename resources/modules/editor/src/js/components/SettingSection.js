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
  };

  componentDidMount() {

    /**
     * Если еще ни разу не открывали текущую вкладку у элемента,
     * то в setActiveSection передадим 0
     */
    let currentElementName = getCurrentElement().getName();
    let currentTab = getCurrentTab();
    if (! (this.props.settingSection[currentElementName]
        && (this.props.settingSection[currentElementName][currentTab] !== undefined))) {
      this.props.dispatch(setActiveSection(getCurrentElement().getName(), getCurrentTab(), 0));
    }
  }

  toggle() {
    this.props.dispatch(setActiveSection(getCurrentElement().getName(), getCurrentTab(), this.props.sectionID));
  };

  render() {
    let currentElementName = getCurrentElement().getName();
    let currentTab = getCurrentTab();
    let activeSectionID = 0;
    /**
     * Сравниваем с undefined
     */
    if (this.props.settingSection[currentElementName]
        && (this.props.settingSection[currentElementName][currentTab] !== undefined)) {
      activeSectionID = this.props.settingSection[currentElementName][currentTab];
    }
    let controllers = this.props.controls || [];
    return (
      <div  className={"settings-section " + (this.props.sectionID === activeSectionID ? 'open' : '')}>
        <div className="settings-section__title d-flex" onClick={this.toggle}>
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
