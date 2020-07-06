import React, {Component} from "react";
import ChevronIcon from '../../svgs/chevron.svg'
import Controller from "../classes/Controller";
import { set } from "lodash";

class SettingSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: props.open,
      active: props.open
    };
    this.toggle = this.toggle.bind(this);
    const open = props.open;
  }

  componentDidMount() {
    document.getElementById("settingsSection0").classList.add('open')
  }

  toggle(e){
    this.setState({
      open: !this.state.open,
      active: e.currentTarget.dataset.key
    });
  }


  render() {
    let settingsControllers = document.getElementById('settingsControllers');
    if(document.getElementById("settingsSection" + this.props.active))
    if(document.getElementById("settingsSection" + this.props.active).classList.contains('open') === false) {
      for(let count = 0; count < settingsControllers.children.length; count++) {
        document.getElementById("settingsSection" + count)
            ? document.getElementById("settingsSection" + count).classList.remove('open') : '';
      }
      document.getElementById("settingsSection" + this.props.active).classList.add('open')
    } else {
      document.getElementById("settingsSection" + this.props.active).classList.remove('open');
    }

    let controllers = this.props.controls || [];
    return <div className="settings-section" id={"settingsSection" + this.props.active}>
    <div className="settings-section">
      <div className="settings-section__title d-flex " data-open={true} data-key={this.props.active} onClick={this.toggle}>
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
              return React.createElement(ControllerComponent, {...controller, key: controller.controlId, controller: new Controller(controller)});
            })
        }
      </div>
    </div>
    </div>
  }
}

export default SettingSection;
