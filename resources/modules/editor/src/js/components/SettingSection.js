import React, {Component} from "react";
import ChevronIcon from '../../svgs/chevron.svg'

class SettingSection extends Component {
  render() {
    let controllers = this.props.controllers || [];
    return <div className="settings-section">
      <div className="settings-section__title d-flex">
        <div className="settings-section__icon">
          <ChevronIcon/>
        </div>
        <div className="settings-section__label">
          {this.props.sectionLabel}
        </div>
      </div>
      <div className="controllers-wrapper">
        {
          controllers.map((controller) => {
                let ControllerComponent = window.controllersManager.getController(controller.controllerName);
                return React.createElement(ControllerComponent, {...controller, key: controller.settingName});
              }
          )
        }
      </div>
    </div>
  }
}

export default SettingSection;