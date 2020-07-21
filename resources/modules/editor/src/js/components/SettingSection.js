import React, {Component} from "react";
import ChevronIcon from '../../svgs/chevron.svg'
import {connect} from "react-redux";
import {getCurrentElement, getCurrentTab} from "../store/store";
import {setActiveSection} from "../store/setting-section/actions";

class SettingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      active: props.open,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
  }

  toggle(e) {
    // this.setState({
    //   open: !this.state.open,
    //   active: e.currentTarget.dataset.key
    //
    // });
    this.props.dispatch(setActiveSection(getCurrentElement().getName(), getCurrentTab(), this.props.sectionID));
  }

  render() {
    let currentElementName = getCurrentElement().getName();
    let currentTab = getCurrentTab();
    let activeSectionId = 0;
    if (this.props.settingSection[currentElementName] && this.props.settingSection[currentElementName][currentTab]) {
      activeSectionId = this.props.settingSection[currentElementName][currentTab];
    }
    let controllers = this.props.controls || [];
    return <div className={"settings-section " + (activeSectionId === this.props.sectionID ? "open" : "")}>
      <div className="settings-section__title d-flex " data-open={true} data-key={this.props.active}
           onClick={this.toggle}>
        <div className="settings-section__icon d-flex ">
          <ChevronIcon/>
        </div>
        <div className="settings-section__label">
          {this.props.label}
        </div>
      </div>
      <div className="controllers-wrapper">
        {
          controllers.map((controller) => {
            let ControllerComponent = window.controllersManager.getController(controller.type);
            return React.createElement(ControllerComponent, {...controller, key: controller.controlId});
          })
        }
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    settingSection: state.settingSectionMenu
  }
}


export default connect(mapStateToProps, null)(SettingSection);
