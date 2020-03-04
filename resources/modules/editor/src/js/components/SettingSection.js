import React, {Component} from "react";
import ChevronIcon from '../../svgs/chevron.svg'

class SettingSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: props.open
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle(){
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    let controllers = this.props.controls || [];
    let sectionClasses = 'settings-section ' + (this.state.open ? 'open' : '');
    return <div className={sectionClasses}>
      <div className="settings-section__title d-flex " onClick={this.toggle}>
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
              }
          )
        }
      </div>
    </div>
  }
}

export default SettingSection;